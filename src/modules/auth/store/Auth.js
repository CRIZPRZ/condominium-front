import { defineStore } from 'pinia';
import { ref } from 'vue';
import condominiumApi from '@/api/CondominiumApi';
 

export const useAuthStore = defineStore('Auth', () => {
    
    const status = ref(false)
    const user = ref(null)
    const token = ref(null)

    const singIn = async (email, password) => {
        try {
            
            const { data } =  await condominiumApi.post('/login', { email, password})
      
            status.value = true
            user.value = data.data.user
            user.token = data.data.token 

            localStorage.setItem("user", JSON.stringify(data.data.user))
            localStorage.setItem( 'token', data.data.token )

           return { ok: true }
        } catch (error) {

            if(error.response.data.message === 'unauthorized'){

                return { ok: false, message: 'Ingrese las credenciales correctas' }
    
           }else{
                const {email, password} = error.response.data.errors
                
                const errors = {
                    emailError: email ? email[0] : null,
                    passwordError: password ? password[0] :  null
                }
                return { ok: false, errors }
               
           }
        
        }
    }

    const checkAuthentication = async () => {

        const tokenAuth = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))  
           
        if( !token ) {
            logout()
            return { ok: false, message: 'No hay token' }
        }
    
        try {
             await condominiumApi.get('/checkToken',{
                headers:  {
                    'Authorization' : `Bearer ${tokenAuth}` 
                }
            })
       

            return { ok: true, user, token }
    
        } catch (error) {
           
            logout()
             
            return { ok: false, message: error.response.data.message }
        }
    
    }

    const logout = () => {

        status.value = false
        user.value = null
        user.token = null

        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }
    
    
    return {
        status,
        user,
        singIn,
        checkAuthentication
    }
});
