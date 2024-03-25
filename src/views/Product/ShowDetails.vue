<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-6 offset-lg-1 mb-4">
        <img :src="product.picture" :alt="product.name" class="img-fluid rounded shadow" />
      </div>
      <div class="col-lg-4">
        <h2 class="product-name"><span>Name :</span> {{ product.name }}</h2>
        <h2 class="product-name"><span>Price :</span> {{ product.price }}</h2>
        <h6 class="category text-muted"><span>Category :</span> {{ categoryName }}</h6>
        <hr />
        <div class="features mt-4">
          <h5 class="mb-3">Features</h5>
          <ul class="list-unstyled"></ul>
        </div>
        <!-- Add action buttons -->
        <div class="action-buttons mt-5">
          <router-link
            :to="{ name: 'editProduct', params: { id: product.id } }"
            class="btn btn-info btn-lg btn-block mb-2"
          >
            Edit Product
          </router-link>
          <button @click="confirmDeletion" class="btn btn-danger btn-lg btn-block mb-2">
            Delete Product
          </button>
          <button id="add-to-cart-button" class="btn btn-warning btn-lg btn-block mb-2">
            Add to Cart
          </button>
          <button id="wishlist-button" class="btn btn-secondary btn-lg btn-block mb-2">
            Add to Wishlist
          </button>
          <button id="show-cart-button" class="btn btn-dark btn-lg btn-block">View Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      product: {},
      categoryName: ''
    }
  },
  props: ['baseURL', 'products', 'categories'],
  methods: {
    confirmDeletion() {
      console.log('confirmDeletion called')
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct()
        }
      })
    },
    async deleteProduct() {
      console.log('deleteProduct called')
      try {
        await axios.delete(`${this.baseURL}products/${this.product.id}`)
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success')
        this.$emit('fetchData')
        this.$router.push({ name: 'listproducts' })
      } catch (error) {
        Swal.fire('Error!', `Product could not be deleted: ${error.message}`, 'error')
      }
    }
  },
  mounted() {
    console.log('mounted hook called')
    const id = this.$route.params.id
    const product = this.products.find((product) => product.id == id)
    if (product) {
      this.product = product
      const category = this.categories.find((category) => category.id == this.product.categoryId)
      this.categoryName = category ? category.name : 'Category not found'
    }
  }
}
</script>

<style scoped>
.product-name {
  color: #333;
  font-weight: 700;
}

.category {
  font-size: 0.9rem;
}

#add-to-cart-button {
  background-color: #febd69;
  border: none;
}

#wishlist-button {
  background-color: #b9b9b9;
  border: none;
}

#show-cart-button {
  background-color: #131921;
  color: white;
  border: none;
}

ul {
  padding-left: 0;
  list-style-type: none;
}

ul li::before {
  content: '✔';
  color: green;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

@media (max-width: 992px) {
  .action-buttons button {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .offset-lg-1 {
    margin-left: 0;
  }
}
</style>
