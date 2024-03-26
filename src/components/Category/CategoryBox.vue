<template>
  <div class="card h-100 w-100">
    <router-link
      :to="{ name: 'ShowCategoryDetails', params: { id: category.id } }"
      class="embed-responsive embed-responsive-16by9"
    >
      <div class="card-header">
        <p class="card-title font-italic">{{ category.name }}</p>
      </div>
      <img
        v-if="category.picture"
        class="card-img-top embed-responsive-item"
        :src="category.picture"
        :alt="`Image of ${category.name}`"
      />
      <div v-else class="card-img-top embed-responsive-item no-image">No Image Available</div>
    </router-link>

    <!-- Card body with parent category below the picture -->
    <div class="card-body">
      <p v-if="parentCategory" class="card-parent font-italic">
        Parent Category: {{ parentCategory.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CategoryBox',
  props: ['category', 'categories'],
  computed: {
    parentCategory() {
      return this.categories.find((cat) => cat.id === this.category.parentId) || null
    }
  }
}
</script>

<style scoped>
.embed-responsive .card-img-top {
  object-fit: cover;
}

.card-header {
  background-color: #fff;
  border-bottom: 0;
  padding: 0.5rem 1rem;
}

.card-title {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-title:hover {
  text-decoration: none;
  color: #0056b3; /* Optional: Change color on hover for visual feedback */
}

.no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  color: #6c757d;
  font-weight: bold;
}

.card-body {
  padding-top: 0.25rem; /* Adjust padding to bring parent category closer to the image */
}

.card-parent {
  font-size: 1.1rem;
  color: #007bff;
  font-weight: 700;
  text-align: center;
  padding: 0.5rem 0;
  background-color: #f8f9fa;
  margin-bottom: 0;
}
</style>
