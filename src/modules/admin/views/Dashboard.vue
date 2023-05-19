<template>
   <div class="bg-white   p-3 rounded-lg shadow-custom" >
  
      rol: <p>{{ auth.user.roles[0].name }}</p>
      permisos: 
      <ul>
         <li v-for="permision in auth.user.roles[0].permissions">{{ permision.name }}</li>
      </ul>
    {{ can('listar usuarios') }}
    {{ role('admin') }}
   </div>
</template>

<script setup>
   import { useAuthStore } from '@/modules/auth/store/Auth';
   import { onMounted } from 'vue';

   const auth = useAuthStore()
 
</script>