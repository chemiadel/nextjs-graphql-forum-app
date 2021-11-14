import { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuthContext"
import { useForm } from "react-hook-form";
import fetcher from "@/lib/fetcher"
import firebase from "firebase/app";
import "firebase/auth"

export default function Modal(){
    const { authUser, loading } = useAuth()
    const { register, watch, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

    useEffect(()=>{
      if(watch("username")==="") return

        clearErrors("username")
        checkUsername().then(data=> {
          if(!data.checkUsername){
            console.log("errors",errors)
            setError("username",{
              type:"manual",
              message: "Invalid"
            })
          }
        })
    
      },[watch("username")])
    
    const onSubmit = (data : any) => {
    fetcher(`mutation EditUser( $input: inputUser!) {
        editUser ( input : $input){
        uid
        username
        }
    }`, data ).then(res=>{
      if(res.editUser?.uid){
        firebase.auth().currentUser?.getIdTokenResult(true)
      }
    })
    }

    function checkUsername(){
    return fetcher(`query {
        checkUsername (username: "${watch("username")}") 
    }`)
    }

    if(loading || !authUser) return null
    if(authUser?.claims?.username) return null


    return <div className="bg-opacity-10	 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
    <div className="bg-white rounded-lg w-3/4 md:w-2/3 lg:w-1/3">

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
            placeholder="Choose Username"
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
                message: "Letters and Numbers only"
              }
            })} 
            type="text" id="username" 
            name="username" 
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <label hidden={!errors?.username} className="leading-7 text-sm text-red-500">{errors.username?.message}</label>
          </div>
        </div>
        <div className="pt-3 mt-3 border-t ml-auto flex flex-row-reverse">
            <button className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Complete
            </button>
        </div>
        </form>

        </div>

    </div>
    </div>
}