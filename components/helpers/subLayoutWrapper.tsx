import { CustomNextPage } from 'lib/types'
import SubLayout from 'components/_subLayout'

import { useEffect } from 'react'
import { useAuth } from 'lib/hooks/useAuthContext'
import { useRouter } from 'next/router'

function Redirect({ Component, children} : 
    { 
      children: React.ReactNode, 
      Component: CustomNextPage
    }){
  
    if(Component.subLayout){
        // const Layout=SubLayout[Component.subLayout]

        
    }
}