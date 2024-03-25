import { createRouter, createWebHistory } from 'vue-router'
import Category from '../views/Category/Category.vue'
import ListProducts from '../views/Category/ListProducts.vue'
import ShowDetails from '../views/Product/ShowDetails.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/listproducts',
      name: 'listproducts',
      component: ListProducts
    },
    {
      path: '/product/show/:id',
      name: 'ShowDetails',
      component: ShowDetails,
      props: true
    }
  ]
})

export default router
