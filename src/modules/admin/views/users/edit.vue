<template>
    <div class="divider">EDITAR USUARIO</div>

    <div class=" mt-10 bg-white shadow-lg p-4 rounded-lg">

        <div class="grid grid-cols-2 gap-x-11 border p-5 rounded-md">

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Nombre completo <span class="text-red-500">*</span></span>
                </label>
                <input v-model="form.name" type="text" placeholder="Ingrese nombre"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.name">{{ errors . name }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Correo <span class="text-red-500">*</span></span>
                </label>
                <input v-model="form.email" type="email" placeholder="Correo electronico"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.email">{{ errors . email }}</small>
            </div>

            <div class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Telefono <span class="text-red-500">*</span></span>
                </label>
                <input v-model="form.phone" type="text" placeholder="Telefono"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.phone">{{ errors . phone }}</small>
            </div>
            <div v-if="!form.updatePassword" class="underline text-blue-800 cursor-pointer flex items-center"
                @click="form.updatePassword = true">
                <div>Cambiar contraseña</div>
            </div>
            <div v-else class="form-control w-full ">
                <label class="label">
                    <span class="label-text">Nueva contraseña <span class="text-red-500">*</span></span>
                </label>
                <input v-model="form.password" type="password" placeholder="************"
                    class="input input-bordered border focus:outline-none w-full " />
                <small class="text-red-500" v-if="errors.password">{{ errors . password }}</small>
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


            <div class="">
                <div>
                    <div class="flex">
                        <div class="flex-none"
                            :class="tab === 'properties' ? 'text-black border-b-0 border ' : 'border-b'">
                            <a class="tab" @click="tab = 'properties'">Propiedades</a>
                        </div>
                        <div class="flex-1 w-full border-b border-b-red-500"></div>
                    </div>
                </div>
                <div class=" border-2 border-t-0">
                    <Properties :id="id" />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
    import condominiumApi from '@/api/CondominiumApi';
    import Properties from './properties/index.vue';
    import {
        onMounted,
        ref
    } from 'vue';
    import {
        toast
    } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const props = defineProps(['id'])

    const form = ref({})
    const loading = ref(false)
    const errors = ref({})
    const tab = ref('properties')

    const getUser = async () => {
        const {
            data: {
                data
            }
        } = await condominiumApi.get(`users/${props.id}`, form.value)
        form.value = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            updatePassword: false
        }
    }

    const update = async () => {

        try {

            loading.value = true
            errors.value = {}
            const {
                data: {
                    data
                }
            } = await condominiumApi.put('users', form.value)

            setTimeout(() => {
                // router.push({name: 'users'})
                loading.value = false
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
        getUser()
    })
</script>
