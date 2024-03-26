<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Navbar from '../src/components/Navbar.vue'
import ListProducts from './views/Category/ListProducts.vue'
const baseURL = 'http://localhost:4300/'
const products = ref(null)
const categories = ref(null)

const fetchData = async () => {
  try {
    const productResponse = await axios.get(`${baseURL}products/all`)
    products.value = productResponse.data
  } catch (err) {
    console.error(err)
  }

  try {
    const categoryResponse = await axios.get(`${baseURL}categories/all`)
    categories.value = categoryResponse.data
  } catch (err) {
    console.error(err)
  }
}
onMounted(fetchData)
</script>

<template>
  <main>
    <Navbar />
    <div style="min-height: 60vh">
      <router-view
        :key="$route.path"
        v-if="products && categories"
        :baseURL="baseURL"
        :products="products"
        :categories="categories"
        @fetchData="fetchData"
      >
      </router-view>
    </div>
  </main>
</template>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
