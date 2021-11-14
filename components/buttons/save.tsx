import {useState} from 'react'
import fetcher from '@/lib/fetcher'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuthContext'

const Save = ({pid, init} : {pid: string, init: boolean | null}) => {
    const [value, setValue]=useState(init)
    const { authUser, loading } = useAuth()

    function toggleSave(){
        fetcher(`mutation {
            toggleSave (pid: "${pid}")
          }`).then(data=>setValue(data.toggleSave))
    }

    if(loading) return null
    if(!authUser) return <Link href={`/login`}>
        <button className={
              `inline-flex items-center h-10 w-10 rounded-full text-base
              ${value?"bg-gray-100":"bg-gray-50"} 
              border border-gray-300
              focus:outline-none hover:bg-gray-100`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto h-6 w-4" fill={value?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        </button>
    </Link>
    
    return <button onClick={toggleSave} className={
      `inline-flex items-center h-10 w-10 rounded-full text-base
      ${value?"bg-gray-100":"bg-gray-50"} 
      border border-gray-300
      focus:outline-none hover:bg-gray-100`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="m-auto h-6 w-4" fill={value?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
 </svg>
</button>
  
  }
  export default Save