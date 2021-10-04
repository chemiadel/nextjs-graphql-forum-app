import Link from 'next/link'
export default function Tabs({children, index, username} : any){
   
    return <section className="text-gray-600 body-font">
    <div className="px-5 ">
      <div className="flex mx-auto flex-nowrap mb-3">
        <Link href={{ 
          pathname:`user/[username]/overview`,
          query: { username: username }
          }} passHref>
        <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===0 ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>Overview
        </a>
        </Link>
        <Link href={{ 
          pathname:`user/[username]/posts`,
          query: { username: username }
          }} passHref>
        <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===1 ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>Posts
        </a>
        </Link>
        <Link href={{ 
          pathname:`user/[username]/saved`,
          query: { username: username }
          }} passHref>
        <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===1 ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>Posts
        </a>
        </Link>
      </div>
      {children}
    </div>
  </section>
}