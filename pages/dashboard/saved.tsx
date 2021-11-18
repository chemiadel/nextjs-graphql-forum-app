import type { CustomNextPage } from 'lib/types'
import Head from 'next/head'
import useSWR from 'swr'
import PostCard from '@/components/cards/postcard'

const Saved : CustomNextPage = () => {

  const { data } = useSWR(`query {
    Me {
        savedPosts {
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
      }
    }`)

  if(!data) return null

  return <>
        <Head>
          <title>Dashboard - Saved</title>
        </Head>
        <ul id="list-post" className="space-y-2 mx-2">
          <li key={data.id}>{data.Me?.savedPosts?.map((data :any)=><PostCard data={data}/>)}</li>
        </ul>
    </>
}

Saved.auth=true
Saved.subLayout='DashboardLayout'
Saved.subLayoutIndex=2

export default Saved