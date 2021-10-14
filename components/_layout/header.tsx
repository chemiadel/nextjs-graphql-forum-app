import { useState } from 'react'
import { useAuth } from 'lib/hooks/useAuthContext'
import Link from 'next/link'
import Menu from 'components/menus/AvatarMenu'
import Search from 'components/modals/search'

export default function Header(props : any){
    const { authUser, loading} = useAuth()
    const [openSearch, setOpenSearch ] = useState(false)

    return <footer className="text-gray-600 body-font">
    <div className="mr-auto container px-5 py-4 mx-auto flex items-center flex-row">
      <span className="mr-auto">
        <Search />
      </span> 

      <Link href="/" passHref>
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 md:w-12 md:h-12 text-white p-2 bg-gray-800 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        {/* <span className="ml-3 text-xl">Tailblocks</span> */}
      </a>
      </Link>

      <div className="ml-auto flex flex-nowrap">
      {/* <span className="my-auto">
      <button className="px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring transition text-gray-600 border-gray-600 hover:bg-gray-200 active:bg-gray-700 focus:ring-gray-300" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
      </button>
      </span>            */}
      <span>
        {authUser?
        <Menu src={authUser?.claims?.picture} username={authUser?.claims?.username} />:
        <Link href={`/login`}>
        <button className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300" type="submit">
          LOGIN
        </button>
        </Link>
        }
      </span>
      </div>
    </div>
  </footer>
  //   <header className="text-gray-600 body-font">
  //   <div className="flex flex-nowrap mx-2 py-2 md:mx-4 md:py-4 ">
  //   <Link href="/" passHref>
  //     <a className="w-1/5 mx-auto my-auto sm:block">
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-gray-700 rounded-full mx-auto" viewBox="0 0 24 24">
  //         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  //       </svg>
  //     </a>
  //     </Link>

  //     {loading ? null :
  //     <div className="w-3/6 flex flex-row-reverse space-x-2" >
        
  //       { authUser? 
  //       <Menu src={authUser?.claims?.picture} username={authUser?.claims?.username} /> : null}
  //       <Link href={ authUser ? "/post/create" : "/login" } prefetch={false}>
  //       <button className="mx-auto my-1 px-4 py-1 rounded-md text-lg font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-gray-600 border-gray-800 hover:bg-gray-700 active:bg-green-800 focus:ring-gray-300" type="submit">
  //           {!authUser? "Join" : "Post"}
  //       </button>
  //       </Link>
  //     </div>  }
  //   </div>
  // </header>
}
