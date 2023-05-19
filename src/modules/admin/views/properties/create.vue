<template>
    <div class="divider">CREAR NUEVA PROPIEDAD</div>
 
    <div class="grid grid-cols-2 gap-x-11 mt-10 bg-white shadow-lg p-4 rounded-lg">

  
        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Calle <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.street" type="text"   class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.street">{{ errors.street }}</small>
        </div>

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Numero <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.number" type="text" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.number">{{ errors.number }}</small>
        </div>

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Colonia </span> 
            </label>
            <input v-model="form.colony" type="text" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.colony">{{ errors.colony }}</small>
        </div>
        
        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Ciudad </span> 
            </label>
            <input v-model="form.city" type="text" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.city">{{ errors.city }}</small>
        </div>

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Estado </span> 
            </label>
            <input v-model="form.state" type="text" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.state">{{ errors.state }}</small>
        </div>

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Pais </span> 
            </label>
            <input v-model="form.country" type="text" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.country">{{ errors.country }}</small>
        </div>
        
        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Codigo Postal </span> 
            </label>
            <input v-model="form.zip" type="text" class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.zip">{{ errors.zip }}</small>
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
import { ref } from 'vue'; 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const form = ref({})
const loading = ref(false)
const errors = ref({})
 
const save = async () => {

    try {
        
        loading.value = true
        errors.value = {}
 
        const { data: { data } } = await condominiumApi.post('properties', form.value)
        
        
        setTimeout(() => {
            
            router.push({name: 'properties'})
            
            toast.success('Propiedad creada con exito !!', {
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
 
</script>