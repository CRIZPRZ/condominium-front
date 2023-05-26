<template>
 
    <!-- Put this part before </body> tag -->
    <input type="checkbox" :checked="store.showModal" id="my-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg text-center">{{ store.action === 'store' ? 'AGREGAR UN ABONO' : 'MODIFICAR ABONO'}}</h3>
             
            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Fecha </span> 
                </label>
                <input v-model="store.payment.date" type="date" class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="store.error.date">{{ store.error.date }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Monto </span> 
                </label>
                <input v-model="store.payment.amount" type="text" class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="store.error.amount">{{ store.error.amount }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Descripcion </span> 
                </label>
                <textarea v-model="store.payment.description" class="input input-bordered border focus:outline-none w-full " rows="10"></textarea>
                <small class="text-red-500" v-if="store.error.description">{{ store.error.description }}</small>
            </div>
            
            <div class="modal-action">
                <button class="btn hover:bg-red-700 bg-red-600 text-white w-40" @click="store.cancel">
                    <div  class=" flex items-center space-x-3">

                        <div>
                            Cancelar
                        </div>
                    </div>
                     
                </button>
                <button v-if="store.action === 'store'" class="btn btn-accent text-white w-40" @click="store.save()">
                    <div  class=" flex items-center space-x-3">

                        <div><v-icon name="fa-database" class="text-white"/></div>
                        <div>
                            Guardar
                        </div>
                    </div>
                     
                </button>
                <button v-else class="btn btn-accent text-white w-40" @click="store.edit()">
                    <div  class=" flex items-center space-x-3">

                        <div><v-icon name="fa-database" class="text-white"/></div>
                        <div>
                            Modificar
                        </div>
                    </div>
                     
                </button>
            </div>
        </div>
    </div>

</template>

<script setup>

import { usePaymentsStore } from './store/Payments';
 
const store = usePaymentsStore()
 
</script>