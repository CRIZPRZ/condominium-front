<template>

<!--  
    <div class="flex justify-end my-4">
        <div class="cursor-pointer" @click="createCharge"><v-icon name="fa-plus" /> nuevo</div>
    </div> -->
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="store.abonos"
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
                    <v-icon name="fa-trash-alt" class="btn-actions" @click="deletePayment(item.value)" />
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
import { useAbonosStore } from './store/Abonos'
import Create from './form.vue'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
 
const props = defineProps(['id'])
const store = useAbonosStore()
const itemsPerPage = ref(50)
const headers = ref([
        { text: '#', align: 'start', value: 'id'},
        { text: 'Fecha', align: 'start', value: 'date' },
        { text: 'Descripcion', align: 'start', value: 'description' },
        { text: 'Monto', align: 'start', value: 'amount' },
        { text: 'Cargo', align: 'start', value: 'cargo' },
        { text: 'acciones', align: 'start', value: 'acciones' },
       
    ])


const createCharge = () => {
    store.abono.property_id = props.id,
    store.showModal = true
}


const editCharge = (abono) => { 
    store.action = 'update'
    store.abono.property_id = props.id,
    store.abono.id = abono.id
    store.abono.amount = abono.amount
    store.abono.date = abono.date
    store.abono.description = abono.description
    store.showModal = true
}


const deletePayment = async payment => {
 
    try {
        
        
        await condominiumApi.delete(`abonos/${payment.id}` )

        toast.success('Pago eliminado con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        store.getAbonos()


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
    store.getAbonos(props.id)
})
</script>