import type { CustomNextPage } from 'lib/types'
import { useState } from 'react'
import PostCard from 'components/cards/postcard'
import useSWR from 'swr'

const Index : CustomNextPage = () => {
  const { data , error } = useSWR(`query{
    Posts{
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

  const [pages, setPages]=useState()

  if(!data) return null
  return <>
    {/* Initial data */}
    {data?.Posts?.map( (post : any) => <PostCard key={post.id} data={post}/> )}
    {/* Loaded data */}
    
    {data?.Posts?.length%4===0 ?
    <button 
    className="mx-auto text-black text-md font-semibold hover:underline w-full m-2 "> 
    Load more </button>
    :null}
    </>
}

Index.subLayout='HomeLayout'
Index.subLayoutIndex=0

export default Index
