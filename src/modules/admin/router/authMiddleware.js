import { useAuthStore } from "../../auth/store/Auth"



const isAuthenticatedGuard = async( to, from, next ) => {
    
    const auth = useAuthStore()
    const res = await auth.checkAuthentication()
    console.log(res);
    if ( res.ok ){
       auth.user = res.user
       auth.token = res.token
       auth.status = true
        next()

    }
    else {
        next({ name: 'login' })
    }
}

export default isAuthenticatedGuard