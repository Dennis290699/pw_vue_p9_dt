import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/token',
    meta: {
      requiereAutorizacion: false,
      esPublico: true
    }
  },
  {
    path: '/token',
    name: 'token',
    component: () => import('../views/TokenView.vue'),
    meta: {
      requiereAutorizacion: false,
      esPublico: true
    }
  },
  {
    path: '/vehiculos',
    name: 'vehiculos',
    component: () => import('../views/VehiculoView.vue'),
    meta: {
      requiereAutorizacion: true,
      esPublico: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Configuración del guardian
router.beforeEach((to, from, next) => {
  const requiereAutorizacion = to.meta.requiereAutorizacion
  const estaLogueado = localStorage.getItem('token')

  if (requiereAutorizacion && !estaLogueado) {
    console.log('No autorizado, redirigiendo a Token page')
    next({
      name: 'token',
      query: { redirect: to.fullPath }
    })
  } else {
    // console.log('Autorizado o pagina publica')
    next()
  }
})

export default router
