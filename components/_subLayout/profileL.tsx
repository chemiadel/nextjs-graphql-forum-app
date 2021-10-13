import Link from 'next/link'
import Head from 'next/head'
import Follow from '../buttons/follow'

function ProfileSettingLayout ( {
  children, 
  index, 
  data 
} : {
    children: React.ReactNode,
    index: number,
    data: any
  } ) {

    
  if(!data?.User) return null
  
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
      <div className="text-gray-600 body-font md:mx-16 lg:mx-36">
            <div className="lg:px-5 pb-5 mx-auto flex flex-wrap flex-col   ">
            <div className="flex flex-row content-center space-x-4 mb-5 p-4 border-b border-gray-200">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
                  <img
                  className="rounded-full object-cover my-auto"
                  src= {data.User.photoURL}
                  alt="Avatar"
                />
                </div>
                <h2 className="text-lg my-auto m-0 text-gray-900 font-medium title-font flex-grow">{data.User.displayName}</h2>
                <Follow to_uid={data.User.uid}/>
                </div>
                <div className="flex flex-wrap border-b-2 ">
                    <Link href={`/user/username/posts`} passHref>
                    <a className={`cursor-pointer sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-2 border-b-0 title-font font-medium  inline-flex items-center leading-none ${index===0 ? "bg-gray-100 border-2  border-black text-black tracking-wider rounded-t":""}`}>
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Posts
                    </a>
                    </Link>
                  </div>
            </div>
            <div className="w-3/3 py-0">
            {children}
            </div>
      </div>
      </main>
    </>
  )
}

export default ProfileSettingLayout