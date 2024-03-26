import { createRouter, createWebHistory } from 'vue-router'
import ListProducts from '../views/Category/ListProducts.vue'
import ShowDetails from '../views/Product/ShowDetails.vue'
import HomeView from '../views/HomeView.vue'
import EditProduct from '../views/Product/EditProduct.vue'
import AddProduct from '../views/Product/AddProduct.vue'
import Category from '../views/Category/Category.vue'
import AddCategory from '../views/Category/AddCategory.vue'

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
    },
    {
      path: '/product/:id/edit',
      name: 'editProduct',
      component: EditProduct
    },
    {
      path: '/product/add',
      name: 'addProduct',
      component: AddProduct
    },
    {
      path: '/categories',
      name: 'ListCategories',
      component: Category
    },
    {
      path: '/categories/add',
      name: 'addCategory',
      component: AddCategory
    }
  ]
})

export default router
