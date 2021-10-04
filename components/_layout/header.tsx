import { useAuth } from '../../lib/hooks/useAuthContext'
import Link from 'next/link'
import Menu from '../menus/AvatarMenu'

export default function Header(props : any){
    const { authUser, loading} = useAuth()

    return <header className="text-gray-600 body-font">
    <div className="flex flex-nowrap mx-4 py-4 ">
    <Link href="/" passHref>
      <a className="w-1/5 mx-auto my-auto sm:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full mx-auto" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </a>
      </Link>

      <div className=" md:block w-3/5">
                    <input type="text" className="w-full py-3 pl-6 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
      </div>
     
      {loading ? null :
      <div className="w-2/5 flex flex-row-reverse space-x-2" >
        
        { authUser? <Menu src={authUser?.claims?.picture} /> : null}
        <Link href={ authUser ? "/post/create" : "/signin" } prefetch={false}>
        <button className="text-white tracking-wider bg-indigo-500 border-0 px-4 focus:outline-none hover:bg-indigo-600 rounded font-bold text-lg">          
            {!authUser? "Join" : "Post"}
        </button>
        </Link>
      </div>  }
    </div>
  </header>
}


