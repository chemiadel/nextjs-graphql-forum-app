import {useState, useEffect} from 'react'
import fetcher from '../../lib/fetcher'

const Save = ({pid, init} : {pid: string, init: boolean | null}) => {
    const [value, setValue]=useState(init)

    function toggleSave(){
        fetcher(`mutation {
            toggleSave (pid: "${pid}")
          }`).then(data=>setValue(data.toggleSave))
    }

    return <button onClick={toggleSave} className={`inline-flex items-center ${!value?"bg-gray-50":"bg-yellow-100"} border-0 mx-1 px-3 focus:outline-none hover:bg-gray-100 rounded-full text-base`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
 </svg>
      </button>
  
  }

  export default Save