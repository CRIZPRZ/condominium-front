import { defineStore } from 'pinia';
import { ref } from 'vue';
import condominiumApi from '@/api/CondominiumApi';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
import { useChargesStore } from '../../cargos/store/Charges';


export const useAbonosStore = defineStore('Abonos', () => {
    
const storeCharge = useChargesStore()
const abonos = ref([]) 
const showModal = ref(false)
const loading = ref(false)
const action = ref('store')

const error = ref({
    date            : '',
    description     : '',
    amount          : ''
}) 
const abono = ref({
    date                : '',
    description         : '',
    amount              : '',
    charge_id           : null,
    property_id         : '',
})

const getAbonos = async id => {

    const { data: { data } } = await condominiumApi.get(`abonos`,{
        params: {
            property_id: id
        }
    })

        abonos.value = data

}

const save = async () => {

    try {
        
        loading.value = true
        error.value = {}
    
        
        await condominiumApi.post('abonos', abono.value)

            getAbonos()
            storeCharge.getCharges()
            cancel()
            toast.success('Abono creado !!', {
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
    
        
        await condominiumApi.put(`abonos/${abono.value.id}`, abono.value)
     
            getAbonos()
            cancel()
            toast.success('Abono Actualizado !!', {
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
    abono.value = {
        date                : '',
        description         : '',
        amount              : '',
        charge_id           : null,
        property_id         : '',
    },
    showModal.value = false
}


    return {
        showModal,
        abono,
        abonos,
        error,
        action,
        save,
        getAbonos,
        cancel,
        edit
    }
});
