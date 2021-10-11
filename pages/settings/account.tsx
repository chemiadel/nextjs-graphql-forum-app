import type { CustomNextPage, FormDataAccount } from 'lib/types'
import SubLayout from 'components/_subLayout/settingsL'
import { useAuth } from 'lib/hooks/useAuthContext'
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import fetcher from 'lib/fetcher'


const Overview : CustomNextPage | null = () => {
  const { authUser, loading} = useAuth()
  const { register, setValue, watch, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  useEffect(()=>{
    clearErrors('username')
    checkUsername().then(data=> {
      if(!data.checkUsername){
        console.log('errors',errors)
        setError("username",{
          type:"manual",
          message: "Invalid"
        })
      }
    })

  },[watch("username")])

  if(loading || !authUser) return null

  const onSubmit = (data : FormDataAccount) => {
    fetcher(`mutation EditUser( $input: inputUser!) {
      editUser ( input : $input){
        uid
        username
      }
    }`,data )
  }

  function checkUsername(){
    return fetcher(`query {
      checkUsername (username: "${watch("username")}") 
    }`)
  }

  return <SubLayout 
          children={<>
            <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-4 mx-auto">
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
     
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="p-2 w-full">
          <img className="rounded-full mx-auto w-1/4" alt="hero" src={authUser.claims.picture}/>
        </div>

        <div className="p-2 w-full">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-600">Email</label>
            <input defaultValue={authUser.claims.email} disabled type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div className="p-2 w-full">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-600">Username</label>
            <input 
            defaultValue={authUser.claims.username} 
            {...register("username", {required:{
                value: true,
                message: "Field required"
              }, minLength: {
                value:3,
                message: "Min 3 Characters"
              }, maxLength: {
                value:12,
                message: "Max 12 Characters"
              }, pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Letters & Numbers only"
              }
            })} 
            type="text" id="username" 
            name="username" 
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label hidden={!errors?.username} className="leading-7 text-sm text-red-500">{errors.username?.message}</label>
          </div>
        </div>

        <div className="p-2 w-full">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-600">Full Name</label>
            <input 
            defaultValue={authUser.claims.name} 
            {...register( "name" , {required:{
                value: true,
                message: "Field required"
              }, minLength: {
                value:3,
                message: "Min 3 Characters"
              }, maxLength: {
                value:12,
                message: "Max 12 Characters"
              }
            })} 
            type="text" id="name" 
            name="name" 
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label hidden={!errors?.name} className="leading-7 text-sm text-red-500">
              {errors?.name?.message}
            </label>

          </div>
        </div>
        <div className="p-2 w-full flex flex-row-reverse">
        <button className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300" type="submit"
         disabled={Object.keys(errors).length !== 0}>Save</button>
        </div>
        </form>

      </div>
    </div>
  </div>
</section>       
          </>}

          index={0}
      />
}

export default Overview