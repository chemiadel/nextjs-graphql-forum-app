
import type { NextPage, GetServerSideProps } from 'next'
import fetcher from 'lib/fetcher'
import Link from 'next/link'
import marked from 'marked'
// import ReactMarkdown from "react-markdown";

import Like from 'components/buttons/like'
import Save from 'components/buttons/save'
import Comment from 'components/cards/comments'
import timeago from 'lib/timeago'
// import { serialize } from 'next-mdx-remote/serialize'
// import { MDXRemote } from 'next-mdx-remote'

import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import {parseCookies} from 'nookies'

interface Params extends ParsedUrlQuery {
   nid: any,
   slug: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {nid, slug}=context.params as Params
    
    const {idToken} = parseCookies(context);
    console.log({idToken})

    const data=await fetcher(`query{
        Post (nid:"${nid}", slug: "${slug}"){
          id
          uid
          created
          title
          tags
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


      console.log(data.Post.content.data)
      return {
        props: {
            data,
            marked: marked(data.Post.content.data)

        }, // will be passed to the page component as props
      }
}

const Home: NextPage = ({data : {Post: data}, marked} : any) => {

    console.log('props', data)

    useEffect(()=>{
      const prev=JSON.parse(localStorage.getItem('history') || `[]`)
      
      localStorage.setItem('history', JSON.stringify([
          ...prev,
          {
            title: data.title,
            nid: data.nid,
            slug: data.slug,
            author: data.user.username
          }
        ]))

    },[])

    console.log('marked',{marked})
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
        <div>
        <button className={
          `inline-flex items-center mx-1 p-1 h-10 w-10 rounded-full text-base
          bg-gray-50
          border border-gray-300
          focus:outline-none hover:bg-gray-100`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto h-6 w-4" fill={"none"} viewBox="0 0 24 24" stroke={"currentColor"}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        </button>
        </div>
        <Save pid={data.id} init={data.save}/>
        <Like pid={data.id} init={data.like} />
        </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl text-gray-900 font-medium title-font my-6">
            { data.title }
          </h2>
          <div>
            {data.tags.map((tag:any, index:number)=><button key={`${tag}-${index}`} className="m-1 my-2 bg-gray-100 border-0 p-1 focus:outline-none hover:bg-gray-200 rounded text-sm mt-0">
              {`# ${tag}`}</button>
            )}
          </div>
          <div className="unreset github-md">
          <div dangerouslySetInnerHTML={{__html: marked}}></div>

          {/* {data.content.data} */}
          {/* <ReactMarkdown>
          {data.content.data}
          </ReactMarkdown> */}
          {/* <MDXRemote {...mdx} /> */}

          </div>
        {/* <p className="leading-relaxed text-base p-4 pt-6"> { data.content.data} </p> */}

      </div>
      <Comment pid={data.id}/>

    </div>
    </div>
}


export default Home
