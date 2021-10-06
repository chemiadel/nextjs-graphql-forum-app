import {useState, useEffect} from 'react'
import fetcher from '../../lib/fetcher'

const Like = ({pid, init} : {pid: string, init: boolean | null}) => {
    const [value, setValue]=useState(init)

    function toggleLike(){
        fetcher(`mutation {
            toggleLike (pid: "${pid}")
          }`).then(data=>setValue(data.toggleLike))
    }

    return <button onClick={toggleLike} className={
    `inline-flex items-center mx-1 p-1 h-10 w-10 rounded-full text-base
    bg-gray-50
    border border-gray-300
    focus:outline-none hover:bg-gray-100`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="m-auto h-6 w-4" fill={value?"currentColor":"none"} viewBox="0 0 24 24" stroke={"currentColor"}>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
      </button>
  
  }

  export default Like