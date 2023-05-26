<template>
 
        <!-- Put this part before </body> tag -->
        <input type="checkbox" :checked="store.show" id="my-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg text-center">AGREGAR NUEVA PROPIEDAD A USUARIO</h3>
                

               
                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">Propiedad <span class="text-red-500">*</span></span> 
                    </label>
                    <select @change="checkCanVoteProperties" v-model="store.form.property_id"  id="" class="input input-bordered border focus:outline-none w-full">
                        <option value="" hidden>Selecciona</option>
                        <option v-for="property in store.properties" :key="property.id" :value="property.id">{{ property.street }}</option>
                    </select>
                    <small class="text-red-500" v-if="errors.property_id">{{ errors.property_id }}</small>
                </div>
                
                
                
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Puede votar</span> 
                    </label>
                    <input :disabled="enableCanVote" v-model="store.form.can_vote" type="checkbox" style="border: 1px solid #37CDBE" class="checkbox checkbox-accent" />
                    <small class="text-red-500" v-if="errors.can_vote">{{ errors.can_vote }}</small>
                </div>

                <div class="modal-action">
                    <button class="btn hover:bg-red-700 bg-red-600 text-white w-40" @click="store.cancel">
                        <div  class=" flex items-center space-x-3">

                            <div>
                                Cancelar
                            </div>
                        </div>
                         
                    </button>
                    <button class="btn btn-accent text-white w-40" @click="save">
                        <div  class=" flex items-center space-x-3">

                            <div><v-icon name="fa-database" class="text-white"/></div>
                            <div>
                                Guardar
                            </div>
                        </div>
                         
                    </button>
                </div>
            </div>
        </div>
    
</template>

<script setup>

import condominiumApi from '@/api/CondominiumApi';
import { useUserPropertiesStore } from './store/UserProperties'; 
import { ref } from 'vue'; 
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 

const store = useUserPropertiesStore()

const loading = ref(false)
const enableCanVote = ref(false)
const errors = ref({}) 

const checkCanVoteProperties = async () => {
    const {data: { data } } = await condominiumApi.get(`checkCanVoteProperties/${store.form.property_id}`)
    
    if ( data ) {
        enableCanVote.value = true;
        store.form.can_vote = false
    }else{   
        enableCanVote.value = false;
    }
}

const save = async () => {

    try {
        
        loading.value = true
        errors.value = {}

        
        await condominiumApi.post('user-properties',store.form)

            store.getUsersProperties(store.form.user_id)
            store.cancel()
            toast.success('Propiedad agregada !!', {
                transition: toast.TRANSITIONS.ZOOM,
                position: toast.POSITION.BOTTOM_CENTER,
            });
       
    } catch (error) {

        let errorResponse = error.response.data.errors
        
        loading.value = false
        for (const field in errorResponse) {
          errors.value[field] = errorResponse[field][0]
        }
    }

}
 
 
</script>