<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Product</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form v-if="product">
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="product.categoryId" required>
              <option v-for="category of categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="product.name" />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" v-model="product.price" />
          </div>
          <button type="button" class="btn btn-primary" @click="editProduct">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert'
export default {
  data() {
    return {
      product: null,
      id: null
    }
  },
  props: ['baseURL', 'products', 'categories'],
  methods: {
    async editProduct() {
      const productData = {
        name: this.product.name,
        categoryId: this.product.categoryId
      }
      axios
        .put(`${this.baseURL}products/${this.id}`, productData)
        .then((res) => {
          this.$emit('fetchData')
          swal({
            text: 'Product Updated Successfully!',
            icon: 'success',
            closeOnClickOutside: false
          })
          this.$router.push({ name: 'listproducts' })
        })
        .catch((err) => {
          console.log('err', err)
          swal({
            text: 'Error updating product. ' + err.message,
            icon: 'error',
            closeOnClickOutside: false
          })
        })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.product = this.products.find((product) => product.id === this.id)
    if (!this.product) {
      swal({
        text: 'Product not found!',
        icon: 'error',
        closeOnClickOutside: false
      }).then(() => {
        this.$router.push({ name: 'listproducts' })
      })
    }
  }
}
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>
