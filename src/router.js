import { createWebHistory, createRouter } from 'vue-router'

import SliderComponent from './components/SliderComponent.vue'
const routes = [
  {
    path: '/',
    redirect: '/tendencia',
  },
  {
    path: '/tendencia',
    name: 'TENDENCIA',
    component: SliderComponent,
  },
  {
    path: '/mis-peliculas',
    name: 'MIS PELICULAS',
    component: SliderComponent,
  },
  {
    path: '/agregadas-recientemente',
    name: 'AGREGADAS RECIENTEM.',
    component: SliderComponent,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
