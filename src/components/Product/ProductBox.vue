<template>
  <div class="card h-100 w-100">
    <div class="card-body">
      <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }" class="stretched-link">
        <h5 class="card-title">{{ product.name }}</h5>
        <h6 class="card-category">{{ category.name }}</h6>
      </router-link>
    </div>
    <div class="embed-responsive embed-responsive-16by9">
      <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }">
        <img
          v-if="product.picture"
          class="card-img-top embed-responsive-item"
          :src="product.picture"
          alt="Product Image"
        />
        <div v-else class="card-img-top embed-responsive-item no-image">No Image Available</div>
      </router-link>
      <div class="card-footer">
        <h5 class="card-price">Price: {{ product.price }} EGP</h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  name: 'ProductBox',
  props: ['product'],
  data() {
    return {
      category: {
        id: '',
        name: 'Loading category...'
      }
    }
  },
  created() {
    this.fetchCategory(this.product.categoryId)
  },
  methods: {
    fetchCategory(categoryId) {
      axios
        .get(`http://localhost:4300/category/${categoryId}`)
        .then((response) => {
          this.category = response.data
        })
        .catch((error) => {
          console.error('Error fetching category:', error)
          this.category.name = 'Unknown Category'
        })
    },

    showDetails() {
      this.$router.push({
        name: 'ShowDetails',
        params: { id: this.product.id }
      })
    }
  }
}
</script>

<style scoped>
.embed-responsive .card-img-top {
  object-fit: cover;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  color: #6c757d;
  font-weight: bold;
  font-size: 1rem;
}

a {
  text-decoration: none;
}

.card-title {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-title:hover {
  font-weight: bold;
}

.card-price {
  font-size: 1.1rem;
  color: #007bff;
  font-weight: 700;
  text-align: center;
  padding: 0.5rem 0;
  background-color: #f8f9fa;
  margin-bottom: 0;
}

.card-text {
  font-size: 0.9rem;
}

#edit-product {
  float: right;
}
.card-footer {
  border-top: 1px solid #dedede;
}
</style>
