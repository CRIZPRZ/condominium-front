<template>
 
    <div class="flex justify-end my-4 mx-4">
        <div class="cursor-pointer" @click="showModalProperty"><v-icon name="fa-plus"/> nuevo</div>
    </div>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="store.usersProperties"
        item-value="name"
        class="elevation-0"
    >
        <template v-slot:item.can_vote="{ item }"> 
            <!-- <pre>{{ item.value.can_vote }}</pre> -->
            <div v-if="item.value.can_vote" class="badge bg-green-500 border-none w-11 py-3">SI</div>
            <div v-else class="badge bg-red-500 border-none w-11 py-3">NO</div>
        </template>
        <template v-slot:item.user="{ item }"> 
            <div>{{ item.value.user.name }}</div>
            <div>{{ item.value.user.email }}</div>
        </template>
        <template v-slot:item.property="{ item }"> 
            <div>{{ item.value.property.street }}</div> 
        </template>
        <template v-slot:item.acciones="{ item }"> 
            <div class="flex space-x-3">
                
                <div class="tooltip" data-tip="Eliminar">
                        <v-icon name="fa-regular-trash-alt" class="btn-actions" @click="deleteProperty(item.props.title.id)" />
                </div>
             
            </div>
        </template>
    </v-data-table>

    <Create/>

</template>

<script setup>
import condominiumApi from '@/api/CondominiumApi';
import { useUserPropertiesStore } from './store/UserProperties';
import Create from './create.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useUserPropertiesStore()
const props = defineProps(['id'])
 
 
 
const itemsPerPage = ref(5)
const headers = ref([
        { title: '#', align: 'start', key: 'id'},
        { title: 'Propiedad', align: 'start', key: 'property' },
        { title: 'Puede Votar', align: 'start', key: 'can_vote' },
        { title: 'acciones', align: 'start', key: 'acciones' },
       
    ])
 
const showModalProperty = () => {
    store.getProperties(props.id)
    store.show = true
    store.form.user_id = props.id
   
}

const deleteProperty = async id => {

    try {
          
        await condominiumApi.delete(`user-properties/${id}` )

        store.getUsersProperties(props.id)
        toast.success('Prpiedad eliminada con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

    getUsersProperties()
    } catch (error) {
       console.log(error);
    }
        
}

 

onMounted( () => {
    store.getUsersProperties(props.id)
    
})
</script>