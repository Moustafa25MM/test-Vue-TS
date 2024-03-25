<template>
  <div class="container">
    <!-- ... other parts of your template ... -->
    <div class="row">
      <img v-show="len == 0" class="img-fluid" src="../../assets/sorry.jpg" alt="Sorry" />
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <!-- Use v-bind:product or :product shorthand to pass the product prop -->
        <ProductBox :product="product"></ProductBox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ProductBox from '../../components/Product/ProductBox.vue'
export default {
  name: 'ListProducts',
  components: {
    ProductBox
  },
  props: {
    // baseURL: String,
    products: Array
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
</style>
