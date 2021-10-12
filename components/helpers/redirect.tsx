import { CustomNextPage } from 'lib/types'
import { useEffect } from 'react'
import { useAuth } from 'lib/hooks/useAuthContext'
import { useRouter } from 'next/router'

function Redirect({ Component, children} : 
    { 
      children: React.ReactNode, 
      Component: CustomNextPage
    }){
  
    const { authUser, loading} = useAuth()
    const router = useRouter()

    useEffect(()=>{
  
      if(Component.auth && !authUser && !loading) router.push('/login')
  
    },[authUser, loading])
  
    if(Component.auth && loading) return null
  
  
    return <>{children}</>
  }

export default Redirect