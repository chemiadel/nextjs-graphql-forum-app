import type { CustomNextPage } from '@/lib/types'
import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import timeago from '@/lib/timeago'

const Posts : CustomNextPage = () => {

  const { data , error } = useSWR(`query {
    Me {
      uid
      username
      displayName
      photoURL
      posts { 
        id
        uid
        created
        title
        nid
        slug
        content {
          type
          data
        }
      }
      savedPosts {
        id
      }
    }
  }`)

  if(!data) return null
  return <>
        <Head>
            <title>Dashboard - Posts</title>
        </Head>
        <ul id="list-post" className="space-y-2 mx-2">
            <li key={data.id}>{data.Me?.posts?.map((data :any)=><Post data={data}/>)}</li>
        </ul>
        </>
}

Posts.auth=true
Posts.subLayout='DashboardLayout'
Posts.subLayoutIndex=1

export default Posts

function Post({data} : any){
  return <div className="w-full ">
      <div className="p-2 pt-0 lg:pt-0 lg:p-4">
        <div className="border border-gray-300 hover:border-gray-600 py-4 px-4 md:p-6 rounded-lg bg-white">
          <div className="flex flex-row content-center border-gray-200">
          <div className="flex-grow flex-col">
              <Link prefetch={false} href={`/post/${data.nid}/${data.slug}`}>
                <h1 className="text-lg md:text-lg pr-2 
                break-normal max-w-xs md:max-w-md
                cursor-pointer text-gray-900 font-medium title-font mb-2">
                  { data.title }
                </h1>
              </Link>
              <h2 className=" text-sm my-auto text-gray-900 flex-grow space-x-2">
                <span>{timeago.ago(new Date(data.created._seconds * 1000))}</span>
              </h2>
          </div>
          <Link prefetch={false} href={`/post/${data.nid}/${data.slug}/edit`}>
              <a className="inline-flex items-center mx-1 p-1 h-10 w-10 rounded-full text-base
                bg-gray-50
                border border-gray-300
                focus:outline-none hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="m-auto h-6 w-4" fill={"none"} viewBox="0 0 24 24" stroke={"currentColor"}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              </a>
          </ Link>
          </div>
        </div>
      </div>
  </div>
}