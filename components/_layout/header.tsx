import { useAuth } from '../../lib/hooks/useAuthContext'
import Link from 'next/link'
import Menu from '../menus/AvatarMenu'

export default function Header(props : any){
    const { authUser, loading} = useAuth()

    return <header className="text-gray-600 body-font">
    <div className="flex flex-nowrap mx-2 py-2 md:mx-4 md:py-4 ">
    <Link href="/" passHref>
      <a className="w-1/5 mx-auto my-auto sm:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-gray-700 rounded-full mx-auto" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </a>
      </Link>

      <div className=" md:block w-4/5">
                    <input type="text" className=" w-full py-3 pl-6 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
      </div>
     
      {loading ? null :
      <div className="w-3/6 flex flex-row-reverse space-x-2" >
        
        { authUser? 
        <Menu src={authUser?.claims?.picture} username={authUser?.claims?.username} /> : null}
        <Link href={ authUser ? "/post/create" : "/login" } prefetch={false}>
        <button className="mx-auto my-1 px-4 py-1 rounded-md text-lg font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-gray-600 border-gray-800 hover:bg-gray-700 active:bg-green-800 focus:ring-gray-300" type="submit">
            {!authUser? "Join" : "Post"}
        </button>
        </Link>
      </div>  }
    </div>
  </header>
}
