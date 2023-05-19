<template>
    <!-- component -->
<!-- This is an example component -->
<div>
   <nav class="bg-dark-purple border-b border-gray-200 fixed z-30 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
         <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
               <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <svg id="toggleSidebarMobileClose" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
               </button>
               <a href="#" class="text-xl font-bold flex items-center lg:ml-2.5">
               <img src="https://demo.themesberg.com/windster/images/logo.svg" class="h-6 mr-2" alt="Windster Logo">
               <span class="self-center whitespace-nowrap text-white">Condominium</span>
               </a>
               
            </div>
            <div class="flex items-center">
               
                <!-- TODO CREATE LOGOUT -->
            </div>
         </div>
      </div>
   </nav>
   <div class="flex overflow-hidden h-screen bg-dark-purple pt-16">
      <aside id="sidebar" class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
         <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-dark-purple pt-0">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
               <div class="flex-1 px-3 bg-dark-purple divide-y space-y-1">
                  <ul class="space-y-2 pb-2">
                     <li>
                        <router-link :to="{name: 'users'}" class="text-base text-gray-300 font-normal rounded-lg hover:bg-gray-400 flex items-center p-2 group ">
                           <v-icon name="fa-user-alt" />
                           <span class="ml-3 flex-1 whitespace-nowrap">Users</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{name: 'settings'}" class="text-base text-gray-300 font-normal rounded-lg hover:bg-gray-400 flex items-center p-2 group ">
                           <v-icon name="fa-cog" />
                           <span class="ml-3 flex-1 whitespace-nowrap">Configuraciones</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{name: 'properties'}" class="text-base text-gray-300 font-normal rounded-lg hover:bg-gray-400 flex items-center p-2 group ">
                           <v-icon name="fa-building" />
                           <span class="ml-3 flex-1 whitespace-nowrap">Propiedades</span>
                        </router-link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </aside>
      
      <div id="main-content" class="h-full w-full p-3 bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="w-full p-3">
                 <router-view></router-view>
            </div>
         </main>
        
      </div>
   </div>
 
</div>
  </template>
  
  <script setup>
  
   
  </script>