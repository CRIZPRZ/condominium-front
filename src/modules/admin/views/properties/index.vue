<template>
    <div class="divider uppercase">GESTIONAR propiedades</div>
 
    <div class="flex justify-end my-4">
        <router-link :to="{name: 'properties.create'}">

            <button class="btn gap-2 bg-blue-500">
                <v-icon name="fa-plus"/>
                Nueva propiedad
            </button>
        </router-link>
    </div>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="properties"
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
                    <v-icon name="fa-trash-alt" class="btn-actions" @click="deleteProperty(item.props.title.id)" /></div>
                <div class="tooltip" data-tip="Editar">
                    
                    <router-link :to="{name: 'properties.edit', params: {id: item.props.title.id}}">
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

const properties = ref([])
const itemsPerPage = ref(5)
const headers = ref([
        { text: '#', align: 'start', value: 'id'},
        { text: 'Calle', align: 'start', value: 'street' },
        { text: 'Numero', align: 'start', value: 'number' },
        { text: 'Colonia', align: 'start', value: 'colony' },
        { text: 'Ciudad', align: 'start', value: 'city' },
        { text: 'Estado', align: 'start', value: 'state' },
        { text: 'Pais', align: 'start', value: 'country' },
        { text: 'Codigo postal', align: 'start', value: 'zip' },
        { text: 'acciones', align: 'start', value: 'acciones' },
       
    ])


    const getProperties = async () => {

    const { data: { data } } = await condominiumApi.get(`properties`)

        properties.value = data

    }

const deleteProperty = async id => {

    try {
          
        await condominiumApi.delete(`properties/${id}` )

        toast.success('Propiedad eliminada con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

    getProperties() 
    } catch (error) {
        toast.error('Ocurrio un error, intentelo mas tarde !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
        
}

onMounted( () => {
    getProperties()
})
</script>