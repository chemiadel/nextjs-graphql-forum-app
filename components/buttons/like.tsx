import {useState, useEffect} from 'react'
import fetcher from '../../lib/fetcher'

const Like = ({pid, init} : {pid: string, init: boolean | null}) => {
    const [value, setValue]=useState(init)

    function toggleLike(){
        fetcher(`mutation {
            toggleLike (pid: "${pid}")
          }`).then(data=>setValue(data.toggleLike))
    }

    return <button onClick={toggleLike} className={`inline-flex items-center ${!value?"bg-gray-50":"bg-red-100"} border-0 mx-1 px-3 focus:outline-none hover:bg-gray-100 rounded-full text-base`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
      </button>
  
  }

  export default Like