<template>
  <div class="container">
    <br />

    <router-link to="/product/add" class="btn btn-success mb-3">Add New Product</router-link>
    <br />
    <br />
    <div class="row">
      <img v-show="len == 0" class="img-fluid" src="../../assets/sorry.jpg" alt="Sorry" />
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ProductBox :product="product"></ProductBox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ProductBox from '../../components/Product/ProductBox.vue'
import axios from 'axios'
export default {
  name: 'ListProducts',
  components: {
    ProductBox
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    fetchProducts() {
      axios
        .get('http://localhost:4300/products/all')
        .then((response) => {
          this.products = response.data
        })
        .catch((error) => {
          console.error('There was an error fetching the products:', error)
        })
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

h5 {
  font-family: 'Roboto', sans-serif;
  color: #686868;
  font-weight: 300;
}
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
</style>
