<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Category</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form v-if="category">
          <div class="form-group">
            <label>Category Name</label>
            <input type="text" class="form-control" v-model="category.name" required />
          </div>
          <div class="form-group">
            <label>Parent Category</label>
            <select class="form-control" v-model="category.parentId">
              <option disabled value="">No parent category</option>
              <option
                v-for="parentCategory in categories"
                :key="parentCategory.id"
                :value="parentCategory.id"
              >
                {{ parentCategory.name }}
              </option>
            </select>
          </div>
          <button type="button" class="btn btn-primary" @click="editCategory">Submit</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      category: null,
      id: null
    }
  },
  props: ['baseURL', 'categories'],
  methods: {
    async editCategory() {
      const categoryData = {
        name: this.category.name,
        parentId: this.category.parentId
      }
      axios
        .patch(`${this.baseURL}categories/${this.id}`, categoryData)
        .then((res) => {
          this.$emit('fetchData')
          Swal.fire({
            text: 'Category Updated Successfully!',
            icon: 'success'
          })
          this.$router.push({ name: 'ListCategories' })
        })
        .catch((err) => {
          Swal.fire({
            text: 'Error updating category. ' + err.message,
            icon: 'error'
          })
        })
    },
    cancelEdit() {
      this.$router.push({ name: 'ListCategories' })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.category = this.categories.find((category) => category.id === this.id)
    if (!this.category) {
      Swal.fire({
        text: 'Category not found!',
        icon: 'error'
      }).then(() => {
        this.$router.push({ name: 'listCategories' })
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
