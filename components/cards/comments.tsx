import { useState } from 'react'
import Link from 'next/link'
import timeago from '../../lib/timeago'
import Button from '../buttons/solid'
import fetcher from '../../lib/fetcher'
import useSWR from 'swr'
import { useAuth } from '../../lib/hooks/useAuthContext'
import marked from 'marked'

export default function Comment({pid} : {pid:string}){
    const [comment, setComment]=useState('')
    const { authUser } = useAuth()
    const {data, mutate, error} = useSWR(`query{
        Comments (pid:"${pid}"){
          id
          uid
          created
          comment
          user {
            uid
            username
            displayName
            photoURL
          }
        }
    }`)

    function onSubmit(){
        return fetcher(`mutation {
            addComment (pid:"${pid}", comment: "${comment}") {
                id
            }
        }`).then(res=>{
            if(res.addComment.id){
                setComment("")
                mutate()
            }
        })
    }

    function deleteComment(commentId:string){
        return fetcher(`mutation {
            deleteComment (commentId: "${commentId}") 
        }`).then(res=>{
            if(res.deleteComment){
                mutate()
            }
        })
    }
    console.log('authUser', authUser)
    return <div className="w-full bg-yellow-50 border border-gray-300 p-6 rounded-lg my-3">
        <div className="pb-2 border-b space-y-4">
        <h1 className="text-2xl font-semibold">Comments</h1>
        <div>
            <textarea 
            value={comment}
            onChange={(e)=>setComment(e.currentTarget.value)} 
            className="border border-gray-300 p-3 rounded-lg w-full" 
            placeholder="Reply (Markdown)"/>
            <div className="flex flex-row-reverse w-full">
            <button disabled={comment===""} onClick={onSubmit} className="px-4 py-2 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-gray-500 border-gray-800 hover:bg-gray-600 disabled:opacity-50 active:bg-gray-700 focus:ring-gray-300" type="submit">
                Reply
            </button>
            </div>
        </div>
        </div>
        {data?.Comments?.map((item : any) =><div key={item.id} className="mb-4 py-4 border-b ">
        <div className="flex flex-row content-center mb-2 pb-2 border-gray-200">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
            <img
            className="rounded-full object-cover"
            src= {item.user.photoURL}
            alt="Avatar"
            />
            </div>
            <div className="flex-grow flex-col">
                <Link href={`/user/${item.user.username}`}>
                <h2 className="cursor-pointer text-md my-auto ml-2 text-gray-900 font-medium title-font flex-grow">
                    { item.user.displayName }</h2>
                </Link>
                <h2 className=" text-sm my-auto ml-2 text-gray-900 flex-grow">
                {timeago.ago(new Date(item.created._seconds*1000))}
                </h2>
            </div>
            {authUser?.claims?.user_id===item.uid && <button onClick={()=>deleteComment(item.id)}>Delete</button>}
        </div>
        <div className="unreset github-md">
          <div dangerouslySetInnerHTML={{__html: marked(item.comment)}}></div>
        </div>
        </div>)}
    </div>
}
