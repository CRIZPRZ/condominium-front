<template>
    <div class="divider">EDITAR PROPIEDADES</div>

    <div class=" mt-10 bg-white shadow-lg p-4 rounded-lg">
        <div class="grid grid-cols-2 gap-x-11 border rounded-md p-5 mt-11">


            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Calle <span class="text-red-500">*</span></span>
                </label>
                <input v-model="form.street" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.street">{{ errors . street }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Numero <span class="text-red-500">*</span></span>
                </label>
                <input v-model="form.number" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.number">{{ errors . number }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Colonia </span>
                </label>
                <input v-model="form.colony" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.colony">{{ errors . colony }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Ciudad </span>
                </label>
                <input v-model="form.city" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.city">{{ errors . city }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Estado </span>
                </label>
                <input v-model="form.state" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.state">{{ errors . state }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Pais </span>
                </label>
                <input v-model="form.country" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.country">{{ errors . country }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Codigo Postal </span>
                </label>
                <input v-model="form.zip" type="text"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.zip">{{ errors . zip }}</small>
            </div>



            <div class="mt-5 flex justify-end col-span-2">
                <button class="btn btn-accent text-white w-40" @click="update">
                    <div v-if="!loading" class=" flex items-center space-x-3">

                        <div>
                            <v-icon name="fa-database" class="text-white" />
                        </div>
                        <div>
                            Modificar
                        </div>
                    </div>
                    <v-icon v-else name="fa-circle-notch" scale="2" class="text-white animate-spin" />
                </button>

            </div>

        </div>


        <div class="border rounded-md p-5 mt-11">

            <div class="flex">
                <div class="flex-none" :class="tab === 'charges' ? 'text-black border-b-0 border-2 border-red-500 ' : 'border-b-2 border-b-red-500'">
                    <a class="tab" @click="tab = 'charges'">Cargos</a>
                </div>
                <div class=""
                    :class="tab === 'payments' ? 'text-black border-b-0 border-2 border-red-500 flex-none' :  'flex-1  border-b-2 border-b-red-500'">
                    <a class="tab" @click="tab = 'payments'">Abonos</a>
                </div>
                <div class="flex-1 w-full border-b-2 border-b-red-500"></div>
            </div>

            <div v-if="tab === 'charges'"> <Charges :id="id"/> </div>
            <div v-if="tab === 'payments'"> <Payments :id="id"/> </div>
        </div>
    </div>

</template>

<script setup>
    import condominiumApi from '@/api/CondominiumApi'; 
    import {  onMounted, ref } from 'vue';
    import { toast } from 'vue3-toastify';
    import Charges from '../charges/Index.vue'
    import Payments from '../payments/Index.vue'
    import 'vue3-toastify/dist/index.css';

    const props = defineProps(['id'])

    const form = ref({})
    const loading = ref(false)
    const tab = ref('charges')
    const errors = ref({})


    const getProperty = async () => {
        const {
            data: {
                data
            }
        } = await condominiumApi.get(`properties/${props.id}`)

        form.value = {
            id: data.id,
            street: data.street,
            number: data.number,
            colony: data.colony,
            city: data.city,
            state: data.state,
            country: data.country,
            zip: data.zip,
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
            const {
                data: {
                    data
                }
            } = await condominiumApi.put(`properties/${props.id}`, form.value)


            setTimeout(() => {
                loading.value = false
                toast.success('Propiedad Actualizada con Exito !!', {
                    transition: toast.TRANSITIONS.ZOOM,
                    position: toast.POSITION.TOP_RIGHT,
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
        getProperty()
    })
</script>
