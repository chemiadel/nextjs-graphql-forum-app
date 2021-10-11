import type { CustomNextPage } from 'lib/types'
import useSWR from 'swr'
import SubLayout from 'components/_subLayout/dashboardL'
import fetcher from 'lib/fetcher'
import Link from 'next/link'
import timeago from 'lib/timeago'
import PostCard from 'components/cards/postcard'

const Saved : CustomNextPage = () => {

  const { data , error } = useSWR(`query {
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

  return (
    <>
      <SubLayout 
          children={<>
                      {data?.Me?.savedPosts?.map( (post : any) => <PostCard key={post.id} data={post}/> )}
          </>}
          index={2}
      />
    </>
  )
}

Saved.auth=true
export default Saved