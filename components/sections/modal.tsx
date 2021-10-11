import { useEffect } from 'react';
import { useAuth } from "../../lib/hooks/useAuthContext"
import { useForm } from "react-hook-form";
import fetcher from '../../lib/fetcher'

export default function Modal(){
    const { authUser, loading} = useAuth()
    const { register, watch, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

    useEffect(()=>{
      if(watch("username")==="") return

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
    
    const onSubmit = (data : FormData) => {
    fetcher(`mutation EditUser( $input: inputUser!) {
        editUser ( input : $input){
        uid
        username
        }
    }`, data )
    }

    function checkUsername(){
    return fetcher(`query {
        checkUsername (username: "${watch("username")}") 
    }`)
    }

    if(loading || !authUser) return null
    if(authUser?.claims?.username) return null


    return <div className="bg-opacity-10	 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
    <div className="bg-white rounded-lg w-1/3">

        <div className="flex flex-col items-start p-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex items-center w-full">

        <div className="mb-2 text-gray-900 font-bold text-xl">Complete signup</div>
        </div>
        <div className="p-2 w-full">
          <div className="relative space-y-2">

            <label className="leading-7 text-sm text-gray-600">Username</label>
            <input 
            defaultValue={authUser.claims.username} 
            placeholder='Choose Username'
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
        <div className="pt-3 mt-3 border-t ml-auto flex flex-row-reverse">
            <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Complete
            </button>
        </div>
        </form>

        </div>

    </div>
    </div>
}


<div className="h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans">
	<div v-if="modal.visible" className="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div className="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
            <div className="mb-4">
                <h1>Complete profile!</h1>
            </div>
            <div className="mb-8">
                <p>Ready to get started? Keep scrolling to see some great components.</p>
            </div>
            <div className="flex justify-center">
                <button className="flex-no-shrink text-white py-2 px-4 rounded bg-teal hover:bg-teal-dark">Let's Go</button>
            </div>
        </div>
    </div>
</div>