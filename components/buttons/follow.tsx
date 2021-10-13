import {useState, useEffect} from 'react'
import fetcher from '../../lib/fetcher'

const Love = ({to_uid} : {to_uid: string}) => {
    const [value, setValue]=useState(false)
    // var pid="bWKEyGZQCYFgqFhXyZUy"

    useEffect(()=>{
        fetcher(`query {
            Follow (to_uid: "${to_uid}")
        }`).then(data=>setValue(data.Follow))
    },[])


    function toggleFollow(){
        fetcher(`mutation {
            toggleFollow (to_uid: "${to_uid}")
          }`).then(data=>setValue(data.toggleFollow))
    }

    return <button 
    onClick={toggleFollow} 
    className={`inline-flex items-center border-2 border-black ${value?" text-white bg-black hover:bg-red-200":"text-black hover:bg-gray-200"} py-1 px-3 focus:outline-none font-bold rounded text-base mt-4 md:mt-0`}>
        {value ? "Following" : "Follow"}
    </button>
  
  }

  export default Love