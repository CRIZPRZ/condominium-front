<template>
    <div class="divider">CREAR NUEVO USUARIO</div>
 
    <div class="grid grid-cols-2 gap-x-11 mt-10 bg-white shadow-lg p-4 rounded-lg">

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Nombre completo <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.name" type="text" placeholder="Ingrese nombre" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.name">{{ errors.name }}</small>
        </div>
        
        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Correo <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.email" type="email" placeholder="Correo electronico" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Telefono <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.phone" type="text" placeholder="Telefono" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.phone">{{ errors.phone }}</small>
        </div>
        
        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Contraseña <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.password" type="password" placeholder="************" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.password">{{ errors.password }}</small>
        </div>
 

        <div class="mt-5 flex justify-end col-span-2"> 
            <button class="btn btn-accent text-white w-40" @click="save">
                <div v-if="!loading" class=" flex items-center space-x-3">

                    <div><v-icon name="fa-database" class="text-white"/></div>
                    <div>
                        Guardar
                    </div>
                </div>
                <v-icon v-else name="fa-circle-notch" scale="2" class="text-white animate-spin"/>
            </button>
 
        </div>
    </div>

</template>

<script setup>
import condominiumApi from '@/api/CondominiumApi';
import router from '@/router';
import { onMounted, ref } from 'vue'; 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const form = ref({})
const loading = ref(false) 
const errors = ref({}) 
 

const save = async () => {

    try {
        
        loading.value = true
        errors.value = {}
        const { data: { data } } = await condominiumApi.post('users',form.value)
        
        
        setTimeout(() => {
            
            router.push({name: 'users'})
            
            toast.success('Usuario creado con exito !!', {
                transition: toast.TRANSITIONS.ZOOM,
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }, 1500);
    } catch (error) {

        let errorResponse = error.response.data.errors
        console.log(errorResponse);
        loading.value = false
        for (const field in errorResponse) {
          errors.value[field] = errorResponse[field][0]
        }
    }

}
 

onMounted(() => { 
   
})
</script>