import condominiumApi from '@/api/CondominiumApi';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserPropertiesStore = defineStore('UserProperties', () => {
    
    const properties        = ref([])
    const usersProperties   = ref([])
    const show              = ref(false)
    const user_id           = ref(null)
    const form              = ref({})

    const getUsersProperties = async id => {

        const { data: { data } } = await condominiumApi.get(`user-properties/${id}`)
        
        usersProperties.value = data
    
    }

    const getProperties = async id => {

        const { data: { data } } = await condominiumApi.get(`getForUser/${id}`)
        
        properties.value = data

    }

    const cancel = () => {
        show.value = false
        form.value = {
            can_vote: null,
            property_id: null
        }
    }

    return {
        show,
        user_id,
        properties,
        form,
        usersProperties,
        getProperties,
        cancel,
        getUsersProperties
    }
});
