import { useState, useRef, useEffect } from "react"
import { signOut } from '../../lib/hooks/useAuthContext'
import Link from 'next/link'


export default function Menu({src, username} : any){
    const [ toggle, setToggle ] = useState(false)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setToggle);

    return <div className="relative ml-auto">
      <button
        className="ml-auto py-auto"
        onClick={()=>setToggle(!toggle)} 
      >
        <img
          className="w-12 h-12 rounded-full object-contain border-2 border-gray-300"
          src={src}
          alt="Avatar"
        />
      </button>
    {toggle?
    <div ref={wrapperRef} className=" font-semibold text-md absolute right-0 z-20 w-48 py-1 mt-2 border border-gray-600 bg-white rounded-md shadow-xl dark:bg-gray-800">
        <Link href={`/post/create`} passHref>
        <a onClick={()=>setToggle(!toggle)} className="border-b block px-4 py-2 text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Create
        </a>
        </Link>
        <Link href={`/dashboard/overview`} passHref>
        <a onClick={()=>setToggle(!toggle)} className="block px-4 py-2  text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Dashboard
        </a>
        </Link>
        <Link href={`/user/${username}`} passHref>
        <a  onClick={()=>setToggle(!toggle)} className="block px-4 py-2 text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Profile
        </a>
        </Link>
        <Link href={`/settings`}  passHref>
        <a  onClick={()=>setToggle(!toggle)} className="block px-4 py-2 text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
            Settings
        </a>
        </Link>
        <a onClick={()=>(signOut())} className="border-t cursor-pointer block px-4 py-2 text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:text-white">
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
