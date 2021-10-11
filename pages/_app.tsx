import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import Layout from 'components/_layout'
import Complete from 'components/sections/modal'
import AuthProvider from 'lib/hooks/useAuthContext'
import 'lib/firebase/init'
import 'tailwindcss/tailwind.css'
import "easymde/dist/easymde.min.css";
import "styles/unreset.scss";
import "styles/markdown.scss";
import { SWRConfig } from 'swr'
import fetcher from 'lib/fetcher'
import dynamic from 'next/dynamic'
const NextNprogress = dynamic(() => import("nextjs-progressbar"),{ssr:false})
import { useAuth } from 'lib/hooks/useAuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {

  return  <AuthProvider>
      <Layout> 
        <SWRConfig 
          value={{
            fetcher : async query => fetcher(query)
          }}>
            <Redirect Component={Component}>
                <NextNprogress height={2} options={{ showSpinner: false }} />
                <Complete />
                <Component {...pageProps} />
            </Redirect>
        </SWRConfig>
      </Layout>
      </AuthProvider>
}

export default MyApp

type authNextPage = NextPage & { auth?: boolean }

function Redirect({ Component, children} : 
  { 
    children: React.ReactNode, 
    Component: authNextPage
  }){

  const { authUser, loading} = useAuth()
  const router = useRouter()

  console.log('Component.auth', Component.auth)
  useEffect(()=>{

    if(Component.auth && !authUser && !loading) router.push('/login')

  },[authUser, loading])

  if(Component.auth && !authUser) return null


  return <>{children}</>
}