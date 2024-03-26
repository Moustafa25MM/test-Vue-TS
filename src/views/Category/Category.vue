<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <br />
        <router-link to="/categories/add" class="btn btn-success mb-3"
          >Add New Category</router-link
        >
        <br />
        <h4 class="pt-3">Our Categories</h4>
      </div>
    </div>
    <div class="row">
      <div
        v-for="category of categories"
        :key="category.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <CategoryBox :category="category" :categories="categories" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryBox from '../../components/Category/CategoryBox.vue'
import axios from 'axios'
export default {
  name: 'Category',
  components: { CategoryBox },
  props: ['baseURL', 'categories'],
  data() {
    return {
      categories: [] // Initialize as an empty array
    }
  },
  methods: {
    fetchCategories() {
      axios
        .get('http://localhost:4300/categories/all')
        .then((response) => {
          this.categories = response.data
        })
        .catch((error) => {
          console.error('There was an error fetching the categories:', error)
        })
    }
  },
  watch: {
    $route(to, from) {
      if (from.path === '/categories/add') {
        this.fetchCategories()
      }
    }
  },
  async mounted() {
    this.fetchCategories()
  }
}
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

#add-category {
  float: right;
  font-weight: 500;
}
</style>
