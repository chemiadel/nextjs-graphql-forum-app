import Link from 'next/link'
import timeago from '../../lib/timeago'
import Like from '../buttons/like'
import Save from '../buttons/save'

export default function PostCard({data} : any){

    if(!data) return null
    
    return <div className="w-full ">
    <div className="p-2 pt-0 lg:pt-0 lg:p-4">
      <div className="border border-gray-300 hover:border-gray-400 py-4 px-4 md:p-6 rounded-lg bg-white">
 
        <div className="flex flex-row content-center border-gray-200">
        <div className="flex-grow flex-col">
            <Link prefetch={false} href={`/post/${data.nid}/${data.slug}`}>
              <h1 className="text-lg md:text-lg pr-2 
              break-normal max-w-xs md:max-w-md
              cursor-pointer text-gray-900 font-medium title-font mb-2
              hover:underline">
                { data.title }
              </h1>
            </Link>
            <h2 className=" text-sm my-auto text-gray-900 flex-grow space-x-2">
              <span>{timeago.ago(new Date(data.created._seconds * 1000))}</span>
              <span className="font-medium">
                  <Link href={`/user/${data.user.username}`}>
                    { `- ${data.user.username}` }
                  </Link>
              </span>
            </h2>
        </div>
        <div className="">
        <Save pid={data.id} init={data.save}/>
        </div>
        </div>
      </div>
    </div>
    </div>
}
