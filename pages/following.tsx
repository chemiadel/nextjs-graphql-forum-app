import type { NextPage } from 'next'
import PostCard from '../components/cards/postcard'
import SubLayout from '../components/_subLayout/homeL'
import useSWR from 'swr'

const Feed : NextPage = () => {
  const { data , error } = useSWR(`query{
    Posts{
      id
      uid
      title
      content {
        type
        data
      }
      user {
        uid
        displayName
        photoURL
      }
    }
  }`)

  return (
    <>
      <SubLayout 
          children={<>
                        {data?.Posts?.map( (post : any) => <PostCard data={post}/> )}

          </>}

          index={2}
      />
    </>
  )
}

export default Feed
