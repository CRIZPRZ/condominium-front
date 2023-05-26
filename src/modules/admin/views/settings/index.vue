<template>
    <div class="divider uppercase">GESTIONAR Configuracion</div>
 
    <div class="flex justify-end my-4">
        <router-link :to="{name: 'settings.create'}">

            <button class="btn gap-2 bg-blue-500">
                <v-icon name="fa-plus"/>
                Nuevo
            </button>
        </router-link>
    </div>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="users"
        item-value="name"
        class="elevation-1"
    >
        <template v-slot:item.logo="{ item }">
           
            <div>
                <img :src="item.props.title.logo" width="100" >
            </div>
        </template>
        <template v-slot:item.acciones="{ item }"> 
            <div class="flex space-x-3">
                <div class="tooltip" data-tip="Eliminar">
                    <v-icon name="fa-trash-alt" class="btn-actions" @click="deleteConfig(item.props.title.id)" /></div>
                <div class="tooltip" data-tip="Editar">
                    
                    <router-link :to="{name: 'settings.edit', params: {id: item.props.title.id}}">
                        <v-icon name="fa-regular-edit" class="btn-actions" />
                    </router-link>
                </div>
                
                 
             
            </div>
        </template>
    </v-data-table>
</template>

<script setup>
import condominiumApi from '@/api/CondominiumApi';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const users = ref([])
const itemsPerPage = ref(5)
const headers = ref([
        { title: '#', align: 'start', key: 'id'},
        { title: 'nombre', align: 'start', key: 'name'},
        { title: 'Calle', align: 'start', key: 'street' },
        { title: 'Numero', align: 'start', key: 'number' },
        { title: 'Colonia', align: 'start', key: 'colony' },
        { title: 'Ciudad', align: 'start', key: 'city' },
        { title: 'Estado', align: 'start', key: 'state' },
        { title: 'Pais', align: 'start', key: 'country' },
        { title: 'Codigo postal', align: 'start', key: 'zip' },
        { title: 'Imagen', align: 'start', key: 'logo' },
        { title: 'acciones', align: 'start', key: 'acciones' },
       
    ])

const getConfigs = async () => {

    const { data: { data } } = await condominiumApi.get('settings')
    
    users.value = data

}

const deleteConfig = async id => {

    try {
          
        await condominiumApi.post('settings/delete/', {id} )

        toast.success('Configuracion eliminado con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        getConfigs()
    } catch (error) {
        toast.error('Ocurrio un error, intentelo mas tarde !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
        
}

onMounted( () => {
    getConfigs()
})
</script>