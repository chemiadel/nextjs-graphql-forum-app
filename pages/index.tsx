import type { CustomNextPage } from 'lib/types'
import PostCard from 'components/cards/postcard'
import SubLayout from 'components/_subLayout/homeL'
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

  return <>
    {data?.Posts?.map( (post : any) => <PostCard key={post.id} data={post}/> )}
    <button className="mx-auto text-black text-md font-semibold hover:underline w-full m-2 "> Load more </button>
    </>
}

Index.subLayout='HomeLayout'
Index.subLayoutIndex=0

export default Index
