<template>

 
    <div class="flex justify-end my-4">
        <div class="cursor-pointer" @click="npm "><v-icon name="fa-plus" /> nuevo</div>
    </div>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="store.charges"
        item-value="name"
        class="elevation-0"
    >
        <template v-slot:item.amount="{ item }">
         <div>${{ item.value.amount }}</div>
        </template>
        <template v-slot:item.paymentsTotal="{ item }">
         <div>${{ item.value.paymentsTotal }}</div>
        </template>
        <template v-slot:item.status="{ item }">
         <div v-if="item.value.state.id === 1" class="bg-[#FEE2E2] rounded-md px-2 text-red-800 flex items-center justify-start w-24 space-x-2">
       
            <div>{{ item.value.state.name }}</div>
        </div>
         <div v-if="item.value.state.id === 2" class="bg-[#D1FAE5] rounded-md px-2 text-gray-700 flex items-center justify-start w-24 space-x-2">
           
            <div>{{ item.value.state.name }}</div>
        </div>
         <div v-if="item.value.state.id === 3" class="bg-[#FEF3C7] rounded-md px-2 text-red-800 flex items-center justify-start w-44 space-x-2">
       
            <div>{{ item.value.state.name }}</div>
        </div>
        </template>
        <template v-slot:item.acciones="{ item }"> 
            <div class="flex space-x-3 items-center">
                <div class="tooltip" data-tip="Agregar Pago" v-if="item.value.state.id != 2">
                    <v-icon name="fa-credit-card" class="btn-actions" @click="addPayment(item.value.id)" />
                </div>
                <div class="tooltip" data-tip="Eliminar">
                    <v-icon name="fa-trash-alt" class="btn-actions" @click="deleteCharge(item.value)" />
                </div>

                <!-- <div @click="editCharge(item.value)" class="tooltip" data-tip="Modificar">                    
                    <v-icon name="fa-regular-edit" class="btn-actions" />
                </div> -->
            </div>
        </template>
    </v-data-table>

    <Create/>
    <Payment/>
</template>

<script setup>
import condominiumApi from '@/api/CondominiumApi';
import { useChargesStore } from './store/Charges'
import { useAbonosStore } from '../abonos/store/Abonos'
import Create from './form.vue'
import Payment from '../abonos/form.vue'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
 
const props = defineProps(['id'])
const store = useChargesStore()
const storePayment = useAbonosStore()
const itemsPerPage = ref(5)
const headers = ref([
        { text: '#', align: 'start', value: 'id'},
        { text: 'Fecha', align: 'start', value: 'date' },
        { text: 'Descripcion', align: 'start', value: 'description' },
        { text: 'Monto', align: 'start', value: 'amount' },
        { text: 'Pagado', align: 'start', value: 'paymentsTotal' },
        { text: 'Estado', align: 'start', value: 'status' },
        { text: 'acciones', align: 'start', value: 'acciones' },
       
    ])


const npm  = () => {
    store.charge.property_id = props.id,
    store.showModal = true
}

const addPayment = (id) => {
    storePayment.showModal = true
    storePayment.abono.charge_id = id
    storePayment.abono.property_id = props.id    // store.showModal = true
}


const editCharge = (charge) => {
    console.log(charge);
    store.action = 'update'
    store.charge.property_id = props.id,
    store.charge.id = charge.id
    store.charge.amount = charge.amount
    store.charge.date = charge.date
    store.charge.description = charge.description
    store.showModal = true
}

const deleteCharge = async charge => {

      
    if ( charge.paymentsTotal > 0 ) {
        toast.error('Ocurrio un error, borre los pagos realizados!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });
        return
    }
    try {
          
        
        await condominiumApi.delete(`charges/${charge.id}` )

        toast.success('Cargo eliminado con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        store.getCharges()
 
    } catch (error) {
        toast.error('Ocurrio un error, intentelo mas tarde !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
        
}

onMounted( () => {
    store.getCharges()
})
</script>