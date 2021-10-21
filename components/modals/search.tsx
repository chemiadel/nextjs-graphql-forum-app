import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import "firebase/auth"
import fetcher from "@/lib/fetcher";

export default function Modal(){
    const [ toggle, setToggle ] = useState(false)
    const [ search, setSearch] = useState('')
    const [ results, setResults] = useState([])

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setToggle);

    function onChange(event: React.FormEvent<HTMLInputElement>){
        const queryText=event.currentTarget.value
        setSearch(queryText)

        if(!queryText) return null
        
        fetcher(`query {
          Search(queryText: "${queryText}"){
            id
            title
            nid
            slug
          }
        }`)
        .then(data=> setResults(data.Search))
    }

    return <>
        <button onClick={()=>setToggle(true)} className="px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring transition text-gray-600 border-gray-600 hover:bg-gray-200 active:bg-gray-700 focus:ring-gray-300" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    
    {toggle?
    <div className="bg-opacity-10	 flex items-center justify-center fixed top-0 left-0 bottom-0 w-full h-full bg-gray-800">
    
    <div  ref={wrapperRef} className="bg-white h-2/3 rounded-lg w-3/4 md:w-2/3 lg:w-1/3">

        <div className="flex flex-col items-start p-4">
        <form className="w-full">

        <div className="flex items-center w-full">

        <div className="mb-2 text-gray-900 font-bold text-xl">Search</div>
        </div>
        <div className="p-2 w-full">
          <div   className="relative space-y-2">
            <input 
            placeholder="Type something"
            required
            autoFocus
            autoComplete='off'
            type="text" 
            id="search" 
            name="search" 
            value={search}
            onChange={onChange}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 border-t space-y-4">
          {results.map((item:any, key:number)=> 
              <div key={item.id} >
              <Link href={`/post/${item.nid}/${item.slug}`}>              
                <a className=" cursor-pointer hover:underline text-gray-800 font-medium title-font" key={item.id}> {item?.title || ''} </a>
              </Link>
              </div>
          )}
        </div>
        </form>

        </div>

    </div>
       
    </div>
    :null}
    
    </>
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
