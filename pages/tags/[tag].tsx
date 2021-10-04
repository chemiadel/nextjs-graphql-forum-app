import type { NextPage } from 'next'
import PostCard from '../../components/cards/postcard'
import Tags from '../../components/cards/history'

import useSWR from 'swr'


const Latest : NextPage = () => {
  const { data , error } = useSWR(`query{
    Posts{
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
      user {
        uid
        username
        displayName
        photoURL
      }
    }
  }`)

  console.log('data', data?.Posts)

  return (
    <>
      <main>
        <div className="md:flex flex-nowrap ">
        <div className=" sm:w-full md:w-2/3"><section className="text-gray-600 body-font">
          <div className="px-0 ">
            {data?.Posts?.map( (post : any) => <PostCard key={post.id} data={post}/> )}
          </div>
        </section>
        </div>
        <div className="hidden md:block w-1/3 space-y-6">
            <Tags />
        </div>
        </div>
      </main>
    </>
  )
}

export default Latest
