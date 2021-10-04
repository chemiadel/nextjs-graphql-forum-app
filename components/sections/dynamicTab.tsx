import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Tabs({children, tabs} : any){
    const [index,setIndex]=useState(0)

    return <section className="text-gray-600 body-font">
      <div className="flex flex-row mx-auto">
        {tabs.map((name : string, i: number)=><a onClick={()=>setIndex(i)} className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${i===index ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>{name}
        </a>)}
      </div>
      {children[index]}
  </section>
}