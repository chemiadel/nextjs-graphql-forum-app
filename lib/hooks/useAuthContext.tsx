import { useState, useEffect, useContext, createContext } from 'react'
import firebase from "firebase/app";
import { setCookie, destroyCookie } from 'nookies'
import "firebase/auth"

type Props = {
  children: React.ReactNode;
};

type UserContext = {
  authUser: any,
  loading: boolean,
}

const authUserContext = createContext<UserContext>({
    authUser: null,
    loading: true
  });


export default function  AuthContextProvider({children} : Props) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  function setUser(user : any){
    user.getIdToken().then(( token : string )=> setCookie(null, 'idToken', token) )
    user.getIdTokenResult().then( (data : any) => setAuthUser(data))   
  }

  useEffect(()=>{
        firebase.auth().onAuthStateChanged((user : any) => {
          if (user) setUser(user)  
          if (!user) (setAuthUser(null), destroyCookie(null, 'idToken'))
          
          setLoading(false)
        
        })

        firebase.auth().onIdTokenChanged((user) => {
          if (user) setUser(user)  
        })
        
        if(authUser){
          const user = firebase.auth().currentUser;
          setUser(user)   
        }
  },[])
  console.log({authUser},{loading})
  return <authUserContext.Provider value={{authUser, loading}}>{children}</authUserContext.Provider>;

}

export const useAuth = () => useContext(authUserContext);

export const signOut = async () => {
  await firebase.auth().signOut()
  destroyCookie(null, 'idToken')

} 
