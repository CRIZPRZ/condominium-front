import { defineStore } from 'pinia';
import { ref } from 'vue';
import condominiumApi from '@/api/CondominiumApi';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
import { useChargesStore } from '../../charges/store/Charges';


export const usePaymentsStore = defineStore('Payments', () => {
    
const storeCharge = useChargesStore()
const payments = ref([]) 
const showModal = ref(false)
const loading = ref(false)
const action = ref('store')

const error = ref({
    date            : '',
    description     : '',
    amount          : ''
}) 
const payment = ref({
    date                : '',
    description         : '',
    amount              : '',
    charge_id           : null,
    property_id         : '',
})

const getPayments = async id => {

    const { data: { data } } = await condominiumApi.get(`payments`,{
        params: {
            property_id: id
        }
    })

    payments.value = data

}

const save = async () => {

    try {
        
        loading.value = true
        error.value = {}
    
        
        await condominiumApi.post('payments', payment.value)

            getPayments()
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
    
        
        await condominiumApi.put(`payments/${payment.value.id}`, payment.value)
     
            getPayments()
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
    payment.value = {
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
        payment,
        payments,
        error,
        action,
        save,
        getPayments,
        cancel,
        edit
    }
});
