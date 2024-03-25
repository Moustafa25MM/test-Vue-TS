<template>
  <div class="container mt-5">
    <h5 class="modal-title mb-4">Add New Product</h5>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <form @submit.prevent="submitProduct" v-else>
      <div class="form-group mb-3">
        <label for="productName">Name</label>
        <input type="text" class="form-control" id="productName" v-model="product.name" required />
      </div>
      <div class="form-group mb-3">
        <label for="productCategory">Category</label>
        <select class="form-control" id="productCategory" v-model="product.categoryId" required>
          <option disabled value="">Please select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="productImage">Image</label>
        <input type="file" class="form-control-file" id="productImage" @change="handleFileUpload" />
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-secondary me-2" @click="cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">Add Product</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      product: {
        name: '',
        categoryId: '',
        picture: null
      },
      categories: [],
      baseUrl: 'http://localhost:4300',
      loading: false
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    handleFileUpload(event) {
      this.product.picture = event.target.files[0]
    },
    async submitProduct() {
      this.loading = true
      const formData = new FormData()
      formData.append('name', this.product.name)
      formData.append('categoryId', this.product.categoryId)
      if (this.product.picture) {
        formData.append('picture', this.product.picture)
      }

      try {
        await axios.post(`${this.baseUrl}/products`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.loading = false
        Swal.fire('Success', 'Product Added Successfully!', 'success')
        this.router.push('/listproducts')
      } catch (error) {
        this.loading = false
        Swal.fire('Error', error.response.data.error, 'error')
      }
    },
    cancel() {
      this.router.push('/listproducts')
    }
  },
  mounted() {
    axios
      .get(`${this.baseUrl}/categories/all`)
      .then((response) => {
        this.categories = response.data
      })
      .catch((error) => {
        console.error('There was an error fetching the categories:', error)
        Swal.fire('Error', 'Failed to fetch categories', 'error')
      })
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control-file {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}
</style>
