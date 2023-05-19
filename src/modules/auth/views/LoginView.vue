<template>
   
   <div class="h-screen w-full flex justify-center items-center">
         <!-- <span>INICIAR SESION</span> -->
        <div class="w-1/2">
            <div class="flex flex-col space-y-5 justify-center items-center">

               <div class="flex flex-col w-1/2 space-y-2">
                  <label for="email">Correo</label>
                  <input v-model="email" type="email" :class="errorEmail ? 'border-red-500' : 'border-gray-200'" id="email" class="p-2  border focus:outline-none rounded-lg w-full" autofocus placeholder="Correo electronico">
                  <small class="text-red-500">{{ errorEmail }}</small>
               </div>
               
               <div class="flex flex-col w-1/2 space-y-2">
                  <label for="password">Contraseña</label>
                  <input v-model="password" type="password" :class="errorEmail ? 'border-red-500' : 'border-gray-200'" id="password" class="p-2  border focus:outline-none rounded-lg w-full" autofocus placeholder="********">
                  <small class="text-red-500">{{ errorPassword }}</small>
               </div>

               <div class="mt-10 w-1/2">
                  <button @click="login" color="#fff" class="text-white border-2 border-gray-700 rounded-xl bg-gray-500 p-3   w-full">
                     <span v-if="!loading">Entrar</span>
                     <v-icon v-else name="fa-circle-notch" scale="1" class="text-white animate-spin"/>
                    
                  </button>
               </div>
            </div>
        </div>
   </div>
</template>

<script setup>
   import router from '@/router';
   import { ref } from 'vue'
   import { useAuthStore } from '../store/Auth';
   import { toast } from 'vue3-toastify';
   import 'vue3-toastify/dist/index.css';

   const loading = ref(false)
   const email = ref('')
   const errorEmail = ref(null)
   const password = ref('')
   const errorPassword = ref(null)
   const auth = useAuthStore()

   const login = async () => {
      loading.value = true
      errorEmail.value = null
      errorPassword.value = null
      const res = await auth.singIn(email.value, password.value)

      console.log(res);
      if ( res.ok ) {
         setTimeout(() => {
            router.push({name: 'Dashboard'})
            loading.value = false
            email.value = ''
            password.value = ''
         }, 1500);
      }else{

         loading.value = false
         if (res.message) {
            toast.error(res.message, {
               transition: toast.TRANSITIONS.ZOOM,
               position: toast.POSITION.BOTTOM_CENTER,
            });


              console.log(res.message);
               return
         }else{
               errorEmail.value = res.errors.emailError
               errorPassword.value = res.errors.passwordError
         }
      }

   }
</script>