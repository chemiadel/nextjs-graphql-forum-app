import { useState, useRef, useEffect } from "react"
import { signOut } from '../../lib/hooks/useAuthContext'
import Link from 'next/link'


export default function Menu({src} : any){
    const [ toggle, setToggle ] = useState(false)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setToggle);

    return <div className="relative lg:mx-2">
      <button
        className="flex items-center"
        onClick={()=>setToggle(!toggle)} 
      >
        <img
          className="mx-auto w-12 h-12 p-1 rounded-full object-cover"
          src={src}
          alt="Avatar"
        />
      </button>
    {toggle?
    <div ref={wrapperRef} className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
        <Link href={`/dashboard/overview`} passHref>
        <a onClick={()=>setToggle(!toggle)} className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Dashboard
        </a>
        </Link>
        <Link href={`/user/me`} passHref>
        <a  onClick={()=>setToggle(!toggle)} className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Profile
        </a>
        </Link>
        <Link href={`/settings`}  passHref>
        <a  onClick={()=>setToggle(!toggle)} className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Settings
        </a>
        </Link>
        <a onClick={()=>(signOut())} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Sign Out
        </a>
    </div> : null }
  </div>
  }


  function useOutsideAlerter(ref : any, setToggle:any) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event : any) {
            if (ref.current && !ref.current.contains(event.target)) {
              setToggle(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
