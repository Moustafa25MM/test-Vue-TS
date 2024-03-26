<template>
  <div class="container mt-5">
    <h5 class="modal-title mb-4">Add New Category</h5>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <form @submit.prevent="submitCategory" v-else>
      <div class="form-group mb-3">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="hasParentCategory"
            v-model="hasParentCategory"
            @change="toggleParentCategory"
          />
          <label for="hasParentCategory" class="form-check-label"> Has Parent Category? </label>
        </div>
      </div>

      <div v-if="showParentCategoryDropdown" class="form-group mb-3">
        <label for="parentCategory">Parent Category</label>
        <select class="form-control" id="parentCategory" v-model="category.parentId">
          <option value="" disabled>Select Parent Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <label for="categoryName">Name</label>
      <input type="text" class="form-control" id="categoryName" v-model="category.name" required />
      <div class="form-group mb-3">
        <label for="categoryImage">Image</label>
        <input
          type="file"
          class="form-control-file"
          id="categoryImage"
          @change="handleFileUpload"
        />
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-secondary me-2" @click="cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">Add Category</button>
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
      category: {
        name: '',
        picture: null
      },
      categories: [],
      baseUrl: 'http://localhost:4300',
      loading: false,
      hasParentCategory: false,
      showParentCategoryDropdown: false
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  async mounted() {
    await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await axios.get(`${this.baseUrl}/categories/all`)
        this.categories = response.data
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch categories.', 'error')
      } finally {
        this.loading = false
      }
    },
    toggleParentCategory() {
      this.showParentCategoryDropdown = this.hasParentCategory
      if (!this.hasParentCategory) {
        this.category.parentId = null
      }
    },
    handleFileUpload(event) {
      this.category.picture = event.target.files[0]
    },
    async submitCategory() {
      this.loading = true
      const formData = new FormData()
      formData.append('name', this.category.name)
      if (this.hasParentCategory && this.category.parentId) {
        formData.append('parentId', this.category.parentId)
      }
      if (this.category.picture) {
        formData.append('picture', this.category.picture)
      }

      try {
        await axios.post(`${this.baseUrl}/categories`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.loading = false
        Swal.fire('Success', 'Category Added Successfully!', 'success')
        this.router.push('/categories')
      } catch (error) {
        this.loading = false
        Swal.fire('Error', error.response.data.error, 'error')
      }
    },
    cancel() {
      this.router.push('/categories')
    }
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
.form-check {
  margin-bottom: 1rem;
}

.form-check-input {
  margin-top: 0.3rem;
}

.form-check-label {
  margin-left: 0.5rem;
}

.form-control {
  margin-bottom: 1rem;
}
h5.modal-title {
  color: #495057;
  font-size: 1.25rem;
  font-weight: bold;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #dee2e6;
  margin-bottom: 1rem;
}
</style>
