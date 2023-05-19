<template>
    <div class="divider">GESTIONAR USUARIOS</div>
 
    <div class="flex justify-end items-center my-4">
        <!-- <div class=" " data-tip=" ">
            <router-link :to="{name: 'properties.user'}">
                <div class="btn-actions">

                    <v-icon name="fa-regular-building" class="" /> <span class="">Propiedades</span>
                </div>
            </router-link>
        </div> -->
        <router-link :to="{name: 'users.create'}">

            <button class="btn gap-2 bg-blue-500">
                <v-icon name="fa-plus"/>
                Nuevo usuario
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
        <template v-slot:item.acciones="{ item }"> 
            <div class="flex space-x-3">
                
                <div class="tooltip" data-tip="Eliminar">
                    <v-icon name="fa-regular-trash-alt" class="btn-actions" @click="deleteUser(item.props.title.id)" />
                </div>
                <div class="tooltip" data-tip="Editar">
                    <router-link :to="{name: 'users.edit', params: {id: item.props.title.id}}">
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
        { title: 'Correo', align: 'start', key: 'email' },
        { title: 'Telefonos', align: 'start', key: 'phone' },
        { title: 'acciones', align: 'start', key: 'acciones' },
       
    ])

const getUsers = async () => {

    const { data: { data } } = await condominiumApi.get('users')
    
    users.value = data

}

const deleteUser = async id => {

    try {
          
        await condominiumApi.post('users/delete/', {id} )

        toast.success('Usuario eliminado con exito !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        getUsers()
    } catch (error) {
        toast.error('Ocurrio un error, intentelo mas tarde !!', {
            transition: toast.TRANSITIONS.ZOOM,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
        
}

onMounted( () => {
    getUsers()
})
</script>