import type { NextPage } from 'next'
import PostCard from 'components/cards/postcard'
import SubLayout from 'components/_subLayout/homeL'
import useSWR from 'swr'

type authNextPage = NextPage & { auth?: boolean }


const Index : authNextPage = () => {
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

  console.log('data', data?.Posts)

  return (
    <>
    
      <SubLayout 
          children={<>
            {data?.Posts?.map( (post : any) => <PostCard key={post.id} data={post}/> )}
          </>}

          index={0}
      />
    </>
  )
}

export default Index
