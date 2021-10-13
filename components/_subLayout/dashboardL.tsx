import type { NextComponentType } from 'next'
import Link from 'next/link'
import Head from 'next/head'

function SubLayout ( {
  children,
  index 
}: { 
  children?: React.ReactNode,
  index?:number
}) {

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
      <div className="text-gray-600 body-font md:mx-16 lg:mx-36">
            <div className="lg:px-5 pb-5 mx-auto flex flex-wrap flex-col   ">
                <div className="flex flex-row content-center mb-4 p-4 pt-2 border-b border-gray-200">
                    <h1 className="text-3xl leading-6 font-bold">Dashboard</h1>
                  </div>
                <div className="flex flex-wrap border-b ">
                  
                    <Link href={`/dashboard/overview`} passHref>
                    <a className={`cursor-pointer sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-2 border-b-0 title-font font-medium  inline-flex items-center leading-none ${index===0 ? "bg-gray-100 border-2 border-black text-black tracking-wider rounded-t":""}`}>
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg> Overview
                    </a>
                    </Link>
                    <Link href={`/dashboard/posts`} passHref>
                    <a className={`cursor-pointer sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-2 border-b-0 title-font font-medium  inline-flex items-center leading-none ${index===1 ? "bg-gray-100 border-2  border-black text-black tracking-wider rounded-t":""}`}>
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Posts
                    </a>
                    </Link>
                    <Link href={`/dashboard/saved`} passHref>
                    <a className={`cursor-pointer sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-2 border-b-0 title-font font-medium  inline-flex items-center leading-none ${index===2 ? "bg-gray-100  border-black text-black tracking-wider rounded-t":""}`}>
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Saved
                    </a>
                    </Link>
                  </div>
            </div>
            {children}
      </div>
      </main>
    </>
  )
}

export default SubLayout