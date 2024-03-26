<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-6 offset-lg-1 mb-4">
        <img :src="category.picture" :alt="category.name" class="img-fluid rounded shadow" />
      </div>
      <div class="col-lg-4">
        <h2 class="category-name"><span>Name :</span> {{ category.name }}</h2>
        <h6 class="category text-muted"><span>Parent Category :</span> {{ parentCategoryName }}</h6>
        <hr />
        <div class="features mt-4">
          <h5 class="mb-3">Features</h5>
        </div>
        <!-- Add action buttons -->
        <div class="action-buttons mt-5">
          <router-link
            :to="{ name: 'editCategory', params: { id: category.id } }"
            class="btn btn-info btn-lg btn-block mb-2"
          >
            Edit Product
          </router-link>
          <!-- <button @click="confirmDeletion" class="btn btn-danger btn-lg btn-block mb-2">
            Delete Product
          </button>
          <button id="add-to-cart-button" class="btn btn-warning btn-lg btn-block mb-2">
            Add to Cart
          </button>
          <button id="wishlist-button" class="btn btn-secondary btn-lg btn-block mb-2">
            Add to Wishlist
          </button>
          <button id="show-cart-button" class="btn btn-dark btn-lg btn-block">View Cart</button> -->
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
      category: {},
      parentCategoryName: ''
    }
  },
  props: ['baseURL', 'categories'],
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
    const categoryId = this.$route.params.id
    axios
      .get(`${this.baseURL}category/${categoryId}`)
      .then((response) => {
        this.category = response.data

        if (this.category.parentId) {
          const parentCategory = this.categories.find(
            (category) => category.id == this.category.parentId
          )
          this.parentCategoryName = parentCategory ? parentCategory.name : 'No parent category'
        } else {
          this.parentCategoryName = 'No parent category'
        }
      })
      .catch((error) => {
        console.error('Error fetching category details:', error)
      })
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
