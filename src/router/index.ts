import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/digimon1',
      redirect(to) {
        return { path: '/digimons' }
      },
      children: [
        {
          path: '',
          name: 'digimons',
          component: () => import('../views/DigimonsView.vue'),
        },
        {
          path: '/digimon1/:digimonId',
          name: 'digimon-card',
          component: () => import('../views/DigimomCardView.vue'),
        }
      ]
    },
  ],
})

export default router
