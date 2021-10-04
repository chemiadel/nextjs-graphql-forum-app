import type { NextPage } from 'next'
import SubLayout from '../../components/_subLayout/settingsL'
import { useAuth } from '../../lib/hooks/useAuthContext'
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import fetcher from '../../lib/fetcher'

type FormData = {
  username: string;
  name : string;
};

const Overview : NextPage = () => {
  const { authUser, loading} = useAuth()
  const { register, setValue, watch, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  useEffect(()=>{
    clearErrors('username')
    checkUsername().then(data=> {
      if(!data.checkUsername){
        console.log('errors',errors)
        setError("username",{
          type:"manual",
          message: "Already taken"
        })
      }
    })

  },[watch("username")])

  if(loading || !authUser) return null

  const onSubmit = (data : FormData) => {
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

  return (
    <>
      <SubLayout 
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
            <input defaultValue={authUser.claims.username} {...register("username")} type="text" id="username" name="username" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label hidden={!errors?.username} className="leading-7 text-sm text-red-500">{errors.username?.message}</label>
          </div>
        </div>

        <div className="p-2 w-full">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-600">Full Name</label>
            <input defaultValue={authUser.claims.name} {...register("name")} type="text" id="fullname" name="fullname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label hidden={!errors?.name} className="leading-7 text-sm text-red-500">Required</label>

          </div>
        </div>
        {/* <div className="p-2 w-full">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-600">Bio</label>
            <textarea  defaultValue={authUser.claims.bio} {...register("bio")} id="bio" name="bio" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
          </div>
        </div> */}

        <div className="p-2 w-full">
          <button disabled={Object.keys(errors).length !== 0} type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50">Submit</button>
        </div>
        </form>

      </div>
    </div>
  </div>
</section>       
          </>}

          index={0}
      />
    </>
  )
}

export default Overview