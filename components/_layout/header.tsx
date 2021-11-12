import { useAuth } from 'lib/hooks/useAuthContext'
import Link from 'next/link'
import Menu from 'components/menus/AvatarMenu'
import Search from 'components/modals/search'

export default function Header(props : any){
    const { authUser } = useAuth()

    return <footer className="text-gray-600 body-font">
    <div className="mr-auto container px-5 py-4 mx-auto flex items-center flex-row">
      <span className="mr-auto">
        <Search />
      </span> 

      <Link href="/" passHref>
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      </a>
      </Link>

      <div className="ml-auto flex flex-nowrap">
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
}
