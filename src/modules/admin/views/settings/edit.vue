<template>
    <div class="divider">EDITAR CONFIGURACION</div>
 
    <div class="grid grid-cols-2 gap-x-11 mt-10 bg-white shadow-lg p-4 rounded-lg">

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Nombre <span class="text-red-500">*</span></span> 
            </label>
            <input v-model="form.name" type="text"  class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.name">{{ errors.name }}</small>
        </div>
        
        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Calle </span> 
            </label>
            <input v-model="form.street" type="text"   class="input input-bordered border focus:outline-none w-full " />
            <small class="text-red-500" v-if="errors.street">{{ errors.street }}</small>
        </div>

        <div class="form-control w-full ">
            <label class="label">
                <span class="label-text">Numero </span> 
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

        <div class="col-span-1 flex justify-center w-full mt-6">

        <div class=" w-1/4 flex flex-col items-center space-y-6 justify-center">
            <div>
                    <img v-if="!url" :src="form.logo" alt="holder" class="w-32">    
                    <img v-else :src="url" alt="holder" class="w-32">    
            </div>
            <div>
                <button @click="uploadFile" class="btn btn-accent text-white w-full">Selccionar imagen</button>
            </div>
        </div>

        <input type="file" @change="changeFile"  class="hidden" accept="image/png, image/jpeg" ref="upload">
        </div>


        <div class="mt-5 flex justify-end col-span-2"> 
            <button class="btn btn-accent text-white w-40" @click="update">
                <div v-if="!loading" class=" flex items-center space-x-3">

                    <div><v-icon name="fa-database" class="text-white"/></div>
                    <div>
                        Modificar
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

const props = defineProps(['id'])

const form = ref({})
const loading = ref(false)
const errors = ref({}) 

const upload = ref(null)
const url = ref(null)

const uploadFile = () => {
    upload.value.click()
}

const changeFile = event => {
    // upload.value.click()
    form.value.logo = event.target.files[0]
    url.value = URL.createObjectURL(event.target.files[0])

}

const gerSetting = async () => {
    const { data: { data } } = await condominiumApi.get(`settings/${props.id}`,form.value)
    form.value = {
        id: data.id,
        name: data.name,
        street: data.street,
        number: data.number, 
        colony: data.colony, 
        city: data.city, 
        state: data.state, 
        country: data.country, 
        zip: data.zip, 
        logo: data.logo, 
    }
}

const update = async () => {

    try {
        
        loading.value = true
        errors.value = {}

        const formData = new FormData();

        for (let key in form.value) {

            if (form.value.hasOwnProperty(key)) {
            
                formData.append(key, form.value[key]);
            }
        }
        const { data: { data } } = await condominiumApi.post('settings/update', formData)
        
        
        setTimeout(() => {
            
            router.push({name: 'settings'})
            
            toast.success('Configuracion modificada con exito !!', {
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
    gerSetting()
})
 
</script>