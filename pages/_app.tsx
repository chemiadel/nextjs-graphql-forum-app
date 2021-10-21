import type { CustomNextComponent } from 'lib/types'
import dynamic from 'next/dynamic'
const NextNprogress = dynamic(() => import("nextjs-progressbar"),{ssr:false})
const Complete = dynamic(() => import('@/components/modals/completeRegistration'),{ssr:false})
import 'lib/firebase/init'
import 'tailwindcss/tailwind.css'
import 'styles/unreset.scss'
import 'styles/github-md.scss'

import Layout from 'components/_layout'
import SubLayouts from 'components/_subLayout'
import AuthProvider from 'lib/hooks/useAuthContext'

import { SWRConfig } from 'swr'
import fetcher from 'lib/fetcher'

import Redirect from 'components/helpers/redirect'

function MyApp({ Component, pageProps }: {
  Component: CustomNextComponent,
  pageProps: any
}) {
  
  console.log({Component, pageProps})

  const SubLayout : any = Component?.subLayout? SubLayouts[Component?.subLayout] : null
  const subLayoutIndex : number | undefined = Component.subLayoutIndex

  return  <AuthProvider>
          <Layout> 
            <SWRConfig 
              value={{
                fetcher : async query => fetcher(query)
              }}>
                <Redirect Component={Component}>
                    <NextNprogress height={2} options={{ showSpinner: false }} />
                    <Complete />
                    {SubLayout?
                    <SubLayout index={subLayoutIndex}> 
                        <Component {...pageProps} />
                    </SubLayout>:
                    <Component {...pageProps} />}
                </Redirect>
            </SWRConfig>
          </Layout>
      </AuthProvider>
}

export default MyApp


