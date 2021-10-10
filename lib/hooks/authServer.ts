import {parseCookies} from 'nookies'
import adminInit from '../firebase/init-admin'

export const authServer =async (ctx : any) => {
    const {idToken} = parseCookies(ctx);

    // console.log('idToken',!!idToken)
    if(!idToken ) return null

    try{

        return await adminInit.auth().verifyIdToken(idToken)
        
    } catch (err){

        console.log('err', err)
        return null
    }
} 