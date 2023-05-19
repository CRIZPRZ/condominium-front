import { useAuthStore } from "@/modules/auth/store/Auth"



export const can = (permissions = null) => {
    console.log(permissions);
    const auth = useAuthStore()
    if (permissions != null) {
        
        const exist = auth.user.roles[0].permissions.filter(permission => permission.name === permissions)
        
        if ( exist.length == 0) {
            return false
        }else {
            return true
        }
    }
    else{
        return false
    }
}

export const role = (rol = null) => {
    const auth = useAuthStore()
    

    if (rol != null) {
        
        const exist = auth.user.roles.filter(role => role.name === rol)
        
        if ( exist.length == 0) {
            return false
        }else {
            return true
        }
    }
    else{
        return false
    }
}