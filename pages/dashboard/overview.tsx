import useSWR from 'swr'
import Head from 'next/head'
import type { CustomNextPage } from '@/lib/types'

const Overview : CustomNextPage = () => {

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
    
  if(!data) return null
  return  <>
          <Head>
            <title>Dashboard - Posts</title>
          </Head>
          <section className="text-gray-600 body-font">
          <div className="container w-1/2 px-5 py-14 mx-auto">
              <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{data?.Me?.posts?.length || 0}</h2>
                  <p className="leading-relaxed">Posts</p>
              </div>
              <div className="p-4 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{data?.Me?.savedPosts?.length || 0}</h2>
                  <p className="leading-relaxed">Saved</p>
              </div>
              
              </div>
          </div>
          </section>
          </>
}

Overview.auth=true
Overview.subLayout='DashboardLayout'
Overview.subLayoutIndex=0

export default Overview