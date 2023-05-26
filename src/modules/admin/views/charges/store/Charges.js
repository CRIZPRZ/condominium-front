import { defineStore } from 'pinia';
import { ref } from 'vue';
import condominiumApi from '@/api/CondominiumApi';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';  


export const useChargesStore = defineStore('Charges', () => {


const charges = ref([]) 
const showModal = ref(false)
const loading = ref(false)
const action = ref('store')

const error = ref({
    date            : '',
    description     : '',
    amount          : ''
}) 
const charge = ref({
    date                : '',
    description         : '',
    amount              : '',
    status_id           : 1,
    property_id         : '',
})

const getCharges = async () => {

    const { data: { data } } = await condominiumApi.get(`charges`)

        charges.value = data

}

const save = async () => {

    try {
        
        loading.value = true
        error.value = {}
    
        
        await condominiumApi.post('charges', charge.value)
     
            getCharges()
             
            cancel()
            toast.success('Cargo creado !!', {
                transition: toast.TRANSITIONS.ZOOM,
                position: toast.POSITION.TOP_RIGHT,
            });
       
    } catch (error) {
    
         
        let errorResponse = error.response.data.errors
        
        loading.value = false
        for (const field in errorResponse) {
          error.value[field] = errorResponse[field][0]
        }
    }
    
}

const edit = async () => {

    try {
        
        loading.value = true
        error.value = {}
    
        
        await condominiumApi.put(`charges/${charge.value.id}`, charge.value)
     
            getCharges()
            cancel()
            toast.success('Cargo Actualizado !!', {
                transition: toast.TRANSITIONS.ZOOM,
                position: toast.POSITION.TOP_RIGHT,
            });
       
    } catch (error) {
    
         
        let errorResponse = error.response.data.errors
        
        loading.value = false
        for (const field in errorResponse) {
          error.value[field] = errorResponse[field][0]
        }
    }
    
}

const cancel = () => {
    loading.value = false
    action.value = 'store'
    charge.value = {
        date                : '',
        description         : '',
        amount              : '',
        status_id           : 1,
        property_id         : '',
    },
    showModal.value = false
}


    return {
        showModal,
        charge,
        charges,
        error,
        action,
        save,
        getCharges,
        cancel,
        edit
    }
});

