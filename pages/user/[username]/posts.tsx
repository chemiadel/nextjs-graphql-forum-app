import type { NextPage } from 'next'
import Head from 'next/head'
import ProfileL from '@/components/_subLayout/profileL'
import PostCard from '@/components/cards/postcard'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const {query} = useRouter()
  const { data } = useSWR(`query{
    User( username: "${query.username}"){
      uid
      username
      email
      displayName
      photoURL
      bio
      posts {
        id
        uid
        created
        nid
        slug
        title
        like
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
  
  if(!data?.User?.username) return null

  return (
    <>
      <Head>
        <title>{`${data?.User?.username} | Posts`}</title>
      </Head>

      <main>
        <div className="flex flex-row">
        <div className="w-full mx-auto">
          <ProfileL index={0} data={data}>
            {data?.User?.posts?.map( (post : any) => <PostCard key={post.id} data={post} /> )}
          </ProfileL>
        </div>
        </div>
      </main>
    </>
  )
}

export default Home
