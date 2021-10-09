import type { NextPage } from 'next'
import useSWR from 'swr'
import SubLayout from '../../components/_subLayout/dashboardL'

const Overview : NextPage = () => {

  const { data , error } = useSWR(`query {
    Me {
      username
      posts { 
        id
      }
      savedPosts {
        id
      }
    }
  }`)
    
  console.log({data})
  if(!data) return null
  return (
    <>
      <SubLayout 
          children={<>
            <section className="text-gray-600 body-font">
            <div className="container w-1/2 px-5 py-14 mx-auto">
                <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 w-1/2">
                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{data.Me.posts.length}</h2>
                    <p className="leading-relaxed">Posts</p>
                </div>
                <div className="p-4 w-1/2">
                    <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{data.Me.savedPosts.length}</h2>
                    <p className="leading-relaxed">Saved</p>
                </div>
                
                </div>
            </div>
            </section>
          </>}

          index={0}
      />
    </>
  )
}

export default Overview