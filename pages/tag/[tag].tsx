import type { CustomNextPage } from '@/lib/types'

import React, { useEffect, useState } from 'react'
import PostCard from '@/components/cards/postcard'
import fetcher from '@/lib/fetcher'
import { useAuth } from '@/lib/hooks/useAuthContext'
import { useRouter } from 'next/router'


const Tag : CustomNextPage = () => {
  const [data, setData] = useState<any>([])
  const [index, setIndex]=useState(0)
  const {query} =useRouter()
  
    
  useEffect(()=> {
    if(query){
        fetchNext()
    }
  },[query])

  if(!query) return null
  async function fetchNext(){
    const { PostsByTag } : any= await fetcher(`query{
      PostsByTag ( page: ${index}, tag:"${query.tag}" ) {
        id
        uid
        created
        title
        nid
        slug
        save
        content {
          type
          data
        }
        user {
          uid
          username
          displayName
          photoURL
        }
      }
    }`)
    if(!PostsByTag) return null
    setIndex(prev=> prev +1 )
    setData([...data, ...PostsByTag ])
  }

  return <>
    <title>{`Tag [${query?.tag || ''}]`}</title>
    <div className="p-2 lg:px-4 lg:py-2">
    <h1 className="p-2 text-4xl font-bold">{`Tag [#${query.tag}]`}</h1>
    </div>
    {/* Initial data */}
    <ul id="post-list">
        {data?.map( (post : any) => <li key={post.id}><PostCard data={post}/></li> )}
    </ul>
    {/* Loaded data */}
    {data.length!==0 && data?.length%4===0 ?
    <button 
    onClick={fetchNext}
    className="mx-auto text-black text-md font-semibold hover:underline w-full m-2"> 
    Load more </button>
    :null}
    {data.length===0?<h1 className="my-32 text-center text-4xl ">No results</h1>:null}
    </>
}

Tag.subLayout='HomeLayout'
Tag.subLayoutIndex=0

export default Tag
