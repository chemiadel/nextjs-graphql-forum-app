import type { CustomNextPage } from '@/lib/types'
import type { GetStaticProps } from 'next'

import React, { useState } from 'react'
import PostCard from '@/components/cards/postcard'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { useAuth } from '@/lib/hooks/useAuthContext'
import { useRouter } from 'next/router'
export const getStaticProps: GetStaticProps = async (context) => {

  const initialData= await fetcher(`query{
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

  console.log({initialData})

  return {
    props: {
      initialData:initialData.Posts,
    },
    revalidate: 60,
  };
}

const Index : CustomNextPage = ({initialData} : any) => {
  const [data, setData] = useState(initialData)
  const [index, setIndex]=useState(1)
  const { authUser, loading } = useAuth()
  const router =useRouter()
  const { data : tagsData , error } = useSWR(`query {
    TopTags 
  }`)

  console.log({data})
  
  async function fetchNext(){
    const { Posts } : any= await fetcher(`query{
      Posts ( page: ${index} ) {
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
    if(!Posts) return null
    setIndex(prev=> prev +1 )
    setData([...data, ...Posts ])
  }

  return <>
    <title>NextCommunity</title>
    <div className="hidden flex flex-nowrap justify-center space-x-4 px-4 py-1  border-b border-gray-300
    bg-white
    ">
    {tagsData?.TopTags?.map((tag: string) => 
        <h1 key={tag} className="text-xl font-bold border-0 focus:outline-none hover:bg-gray-200 rounded">
          {`${tag.toLocaleLowerCase()}`}
        </h1>
    )}
    </div>
    <div className="p-2 lg:px-4 lg:py-2">
    <div className="p-2 flex flex-row border border-gray-300 rounded-md bg-white">
      <img
          className="flex-grow rounded-full m-1 w-10 h-10 "
          src= {authUser?.claims?.picture || 'https://api-private.atlassian.com/users/850ae4c9bf8ca767eb65b41f527f5e3b/avatar'}
          alt="Avatar"
      />
      <div className="flex flex-row w-full">
        <input
          onClick={()=>{
            router.push(authUser?'/post/create':'/login')
          }}
          id="default"
          type="text"
          name="default"
          placeholder="Create post"
          className="flex-grow mx-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

    </div>
    </div>
    {/* Initial data */}
    {data?.map( (post : any) => <PostCard key={post.id} data={post}/> )}
    {/* Loaded data */}
    {data?.length%4===0 ?
    <button 
    onClick={fetchNext}
    className="mx-auto text-black text-md font-semibold hover:underline w-full m-2 "> 
    Load more </button>
    :null}
    </>
}

Index.subLayout='HomeLayout'
Index.subLayoutIndex=0

export default Index
