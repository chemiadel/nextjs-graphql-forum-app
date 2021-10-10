import type { AppProps } from 'next/app'
import Layout from '../components/_layout'
import AuthProvider from '../lib/hooks/useAuthContext'
import './../lib/firebase/init'
import 'tailwindcss/tailwind.css'
import "easymde/dist/easymde.min.css";
import { useAuth } from '../lib/hooks/useAuthContext'
import { SWRConfig } from 'swr'
import fetcher from '../lib/fetcher'

function MyApp({ Component, pageProps }: AppProps) {

  return  <AuthProvider>
      <Layout> 
        <SWRConfig 
          value={{
            fetcher : async query => fetcher(query)
          }}>
            <Redirect Component={Component}>
            <Component {...pageProps} />
            </Redirect>
        </SWRConfig>
      </Layout>
      </AuthProvider>
}

export default MyApp

function Redirect({children, Component} : {
  children: React.ReactNode
  Component: any
}){

  if(Component.private) return <>{children}</>

  return <>{children}</>
}