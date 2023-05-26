<template>
 
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="store.payments"
        item-value="name"
        class="elevation-0"
    >
        <template v-slot:item.amount="{ item }">
         <div>${{ item.value.amount }}</div>
        </template>
        <template v-slot:item.cargo="{ item }">
         <div v-if="item.value.charge">{{ item.value.charge.description }}</div>
            <div v-else class="bg-[#FEE2E2] rounded-md px-2 text-red-800 flex items-center justify-start w-24 space-x-2">
                <div>Sin cargo</div>
            </div>
        </template>
        <template v-slot:item.acciones="{ item }"> 
            <div class="flex space-x-3 items-center">
                <div class="tooltip" data-tip="Eliminar">
                    <v-icon name="fa-trash-alt" class="btn-actions" @click="destroyPayment(item.value)" />
                </div>
                <!-- <div @click="editCharge(item.value)">                    
                        <v-icon name="fa-regular-edit" class="btn-actions" />
                </div> -->
                <div @click="downloadPdf(item.value)" class="tooltip" data-tip="Descargar PDF">    
                    <BIconFiletypePdf class="btn-actions" />                
                </div>
            </div>
        </template>
    </v-data-table>

    <Create/>
</template>

<script setup>
import condominiumApi from '@/api/CondominiumApi';
import { usePaymentsStore } from './store/Payments'
import Create from './form.vue'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
 
const props = defineProps(['id'])
const store = usePaymentsStore()
const itemsPerPage = ref(50)
const headers = ref([
        { title: '#', align: 'start', key: 'id'},
        { title: 'Fecha', align: 'start', key: 'date' },
        { title: 'Descripcion', align: 'start', key: 'description' },
        { title: 'Monto', align: 'start', key: 'amount' },
        { title: 'Cargo', align: 'start', key: 'cargo' },
        { title: 'acciones', align: 'start', key: 'acciones' },
       
    ])


const createCharge = () => {
    store.abono.property_id = props.id,
    store.showModal = true
}


const editCharge = (payment) => { 
    store.action = 'update'
    store.payment.property_id = props.id,
    store.payment.id = payment.id
    store.payment.amount = payment.amount
    store.payment.date = payment.date
    store.payment.description = payment.description
    store.showModal = true
}


const destroyPayment = async payment => {
 
    try {
        
        
        await condominiumApi.delete(`payments/${payment.id}` )

        toast.success('Pago eliminado con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        store.getPayments()


    } catch (error) {
        toast.error('Ocurrio un error, intentelo mas tarde !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
        
}


const downloadPdf = async payment => {
        try{


            
            const res = await condominiumApi.post('/download-pdf', {
                        id: payment.id
                    }, {responseType: 'arraybuffer'});

         
                    let blob = new Blob([res.data],  {type: 'application/pdf'} )
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = `${payment.charge.description}-${payment.id}.pdf`
                    link.click()
        }
 
            
        catch{

            console.log(error);
        }
    }
 
onMounted( () => {
    store.getPayments(props.id)
})
</script>