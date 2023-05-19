export default {

    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Admiin layout" */ '@/modules/admin/layouts/DashboardLayout.vue'),
    children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/Dashboard.vue'),
        },
        {
          path: '/dashboard/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/users/index.vue'),
        },
        {
          path: '/dashboard/users/create',
          name: 'users.create',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/users/create.vue'),
        },
       
        { 
          path: '/dashboard/users/edit/:id?',
          name: "users.edit",
          component: () => import(/* webpackChunkName: "cdiForm" */ '@/modules/admin/views/users/edit.vue'),
          props: ( router ) => {
            
              const id = Number( router.params.id )
              
              return isNaN( id ) ? { id: 0} : { id }
   
          }
        },

        // SETTINGS
        {
          path: '/dashboard/settings',
          name: 'settings',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/settings/index.vue'),
        },
        {
          path: '/dashboard/settings/create',
          name: 'settings.create',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/settings/create.vue'),
        },
       
        { 
          path: '/dashboard/settings/edit/:id?',
          name: "settings.edit",
          component: () => import(/* webpackChunkName: "cdiForm" */ '@/modules/admin/views/settings/edit.vue'),
          props: ( router ) => {
            
              const id = Number( router.params.id )
              
              return isNaN( id ) ? { id: 0} : { id }
   
          }
        },


        // SETTINGS
        {
          path: '/dashboard/properties',
          name: 'properties',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/properties/index.vue'),
        },
        {
          path: '/dashboard/properties/create',
          name: 'properties.create',
          component: () => import(/* webpackChunkName: "Dashoard layout" */ '@/modules/admin/views/properties/create.vue'),
        },
       
        { 
          path: '/dashboard/properties/edit/:id?',
          name: "properties.edit",
          component: () => import(/* webpackChunkName: "cdiForm" */ '@/modules/admin/views/properties/edit.vue'),
          props: ( router ) => {
            
              const id = Number( router.params.id )
              
              return isNaN( id ) ? { id: 0} : { id }
   
          }
        },
      
        
    ]
}