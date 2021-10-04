
import type { NextPage, GetServerSideProps } from 'next'
import useSWR from 'swr'
import fetcher from '../../../lib/fetcher'
import Link from 'next/link'
import Like from '../../../components/buttons/like'
import Save from '../../../components/buttons/save'
import timeago from '../../../lib/timeago'

import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
   nid: any,
   slug: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {nid, slug}=context.params as Params
    
    const data=await fetcher(`query{
        Post (nid:"${nid}", slug: "${slug}"){
          id
          uid
          created
          title
          nid
          slug
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
      }`, null, context.req.headers)

      return {
        props: {
            data
        }, // will be passed to the page component as props
      }
}

const Home: NextPage = ({data : {Post : data}}:any) => {

    console.log('props', data)

    // return null
    return <div className="mx-auto w-full lg:w-3/4 ">
    <div className="p-2 lg:pt-0 lg:p-4">
      <div className="border border-gray-300 p-6 rounded-lg bg-white">
 
        <div className="flex flex-row content-center mb-4 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
          <img
          className="rounded-full object-cover"
          src= {data.user.photoURL}
          alt="Avatar"
        />
        </div>
        <div className="flex-grow flex-col">
            <Link href={`/user/${data.user.username}`}>
              <h2 className="cursor-pointer text-md my-auto ml-2 text-gray-900 font-medium title-font flex-grow">{ data.user.displayName }</h2>
            </Link>
            <h2 className=" text-sm my-auto ml-2 text-gray-900 flex-grow">
              {timeago.ago(new Date(data.created._seconds * 1000))}
            </h2>
        </div>
        <Save pid={data.id} init={data.save}/>
        <Like pid={data.id} init={data.like} />
        </div>
          <h2 className="text-3xl text-gray-900 font-medium title-font mb-2">
            { data.title }
          </h2>
          <div>
          <button className="m-1 my-2 bg-gray-100 border-0 p-1 focus:outline-none hover:bg-gray-200 rounded text-sm mt-0">#Following</button>
          <button className="m-1 my-2 bg-gray-100 border-0 p-1 focus:outline-none hover:bg-gray-200 rounded text-sm mt-0">#Following</button>
          <button className="m-1 my-2 bg-gray-100 border-0 p-1 focus:outline-none hover:bg-gray-200 rounded text-sm mt-0">#Following</button>
          <button className="m-1 my-2 bg-gray-100 border-0 p-1 focus:outline-none hover:bg-gray-200 rounded text-sm mt-0">#Following</button>

          </div>
        <p className="leading-relaxed text-base p-4 pt-6"> { data.content.data} </p>
      </div>
    </div>
    </div>
}


export default Home
