import Link from 'next/link'
import Head from 'next/head'
import Tags from '../cards/toptags'

function HOC ( {
  children, 
  index } : {
    children?: React.ReactNode,
    index?: number
  } ) {

  return (
    <>
      <main>
        <div className="md:flex flex-nowrap ">
        <div className=" sm:w-full md:w-2/3">
          <section className="text-gray-600 body-font">
          <div className="px-0 my-0">
            {/* <div className="flex mx-auto flex-nowrap mb-3">
              <Link href="/" passHref>
              <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===0 ? "bg-gray-100 border-black text-black tracking-wider rounded-t":""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>Latest
              </a>
              </Link>
              <Link href="/hot" passHref>
              <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===1 ? "bg-gray-100 border-black text-black tracking-wider rounded-t":""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>Hot
              </a>
              </Link>
              <Link href="/following" passHref>
              <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===2 ? "bg-gray-100 border-black text-black tracking-wider rounded-t":""}`}>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>Following
              </a>
              </Link>
            </div> */}
            {children}
          </div>
        </section>
        </div>
        <div className="hidden md:block w-1/3 space-y-6">
            {/* <TopUsersCard /> */}
            <Tags />
        </div>
        </div>
      </main>
    </>
  )
}

export default HOC