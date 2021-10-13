import Link from 'next/link'
import Head from 'next/head'

function SettingLayout ( {children, index } : {
  children: React.ReactNode,
  index: number
} ) {


  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
      <div className="text-gray-600 body-font md:mx-16 lg:mx-36">
            <div className="lg:px-5 pb-5 mx-auto flex flex-wrap flex-col   ">
                <div className="flex flex-row content-center mb-4 p-4 border-b border-gray-200">
                    <h1 className="text-3xl leading-6 font-bold">Settings</h1>
                  </div>
                <div className="flex flex-wrap border-b-2 ">
                  
                    <Link href={`/dashboard/overview`} passHref>
                    <a className={`cursor-pointer sm:px-6 py-3 w-1/3 sm:w-auto justify-center sm:justify-start border-2 border-b-0 title-font font-medium  inline-flex items-center leading-none rounded-t ${index===0 ? "bg-gray-100 border-2 border-black text-black tracking-wider ":""}`}>
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg> Account
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

export default SettingLayout