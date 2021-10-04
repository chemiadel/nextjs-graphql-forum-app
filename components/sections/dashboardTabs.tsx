import Link from 'next/link'
export default function Tabs({children, index} : any){
   
    return <section className="text-gray-600 body-font">
    <div className="container px-5 py-2 mx-auto flex flex-nowrap flex-col w-2/3">
      <div className=" mx-auto mb-3 flex flex-nowrap">
        <Link href="/dashboard/overview" passHref>
        <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===0 ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>Overview
        </a>
        </Link>
        <Link href="/dashboard/posts" passHref>
        <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===1 ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>Posts
        </a>
        </Link>
        <Link href="/dashboard//saved" passHref>
        <a className={`cursor-pointer sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${index===2 ? "bg-gray-100 border-indigo-500 text-indigo-500 tracking-wider rounded-t":""}`}>
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>Saved
        </a>
        </Link>
      </div>
      <div>{children}</div>
      
    </div>
  </section>
}