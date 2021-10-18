import { useEffect, useState } from 'react'
import Link from 'next/link'

type THistory = {
  title:string,
  nid:number,
  slug:string,
  author: string
}
export default function History(){
    const [data, setData]=useState<THistory[]>()

    useEffect(()=>{
      let historyData=JSON.parse(localStorage.getItem('history') || '[]')
      console.log({historyData})
      setData(historyData)
    },[])

  
    return <div className="py-2 border border-gray-400 bg-white  rounded-lg m-2">
        <h2 className="text-2xl my-auto mx-2 p-2 pb-3 border-b text-gray-900 font-bold title-font">
          Last visited
        </h2>
        <div className="divide-y divide-gray-100 space-y-2">
        {data?.slice(0).reverse().slice(0,5).map(({nid, slug, title, author}, key) => 
        <div key={`${nid}${key}`} className="py-1 px-6 text-black font-medium title-font text-md">
            <div>
              <Link href={`/post/${nid}/${slug}`}>
              <h1 className="cursor-pointer hover:underline truncate" >{ `${title}` }</h1>
              </Link>
            </div>
            <div className="text-xs text-gray-600 ">
              <Link href={`user/${author}`}><a>{`by ${author}`}</a></Link>
            </div>
        </div>)}
        </div>
    </div>
}
