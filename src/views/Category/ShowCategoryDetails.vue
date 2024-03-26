<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-6 offset-lg-1 mb-4" v-if="category.picture">
        <img :src="category.picture" :alt="category.name" class="img-fluid rounded shadow" />
      </div>
      <div class="col-lg-4">
        <h2 class="category-name"><span>Category Name :</span> {{ category.name }}</h2>
        <h6 class="category text-muted"><span>Parent Category :</span> {{ parentCategoryName }}</h6>
        <hr />
        <div class="features mt-4">
          <!-- Display child categories -->
          <ul v-if="category.children && category.children.length > 0">
            <h5>Sub Categories :</h5>
            <li v-for="childCategory in category.children" :key="childCategory.id">
              {{ childCategory.name }} ({{ childCategory.productsCount }} products)
              <ul>
                <li v-for="product in childCategory.products" :key="product.id">
                  {{ product.name }}
                </li>
              </ul>
            </li>
          </ul>
          <div v-else>No Subcategories</div>
        </div>
        <!-- Add action buttons -->
        <div class="action-buttons mt-5">
          <router-link
            :to="{ name: 'editCategory', params: { id: category.id } }"
            class="btn btn-info btn-lg btn-block mb-2"
          >
            Edit Category
          </router-link>
          <button
            @click="confirmDeletion"
            class="btn btn-danger btn-lg btn-block mb-2"
            :disabled="hasChildren"
            :title="hasChildren ? 'Cannot delete category with subcategories' : ''"
          >
            Delete Category
          </button>
          <p v-if="hasChildren" class="text-danger">
            Cannot delete category because it has subcategories.
          </p>
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
      parentCategoryName: '',
      hasChildren: false
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
          this.deleteCategory()
        }
      })
    },
    async deleteCategory() {
      console.log('deleteCategory called')
      try {
        await axios.delete(`${this.baseURL}categories/${this.category.id}`)
        Swal.fire('Deleted!', 'Your category has been deleted.', 'success')
        this.$emit('fetchData')
        this.$router.push({ name: 'ListCategories' })
      } catch (error) {
        Swal.fire('Error!', `Category could not be deleted: ${error.message}`, 'error')
      }
    }
  },
  mounted() {
    console.log('mounted hook called')
    const categoryId = this.$route.params.id
    axios
      .get(`${this.baseURL}categories/products/tree/${categoryId}`)
      .then((response) => {
        this.category = response.data
        this.hasChildren = this.category.children && this.category.children.length > 0

        if (this.category.parentId) {
          // Fetch the parent category name as needed
          axios.get(`${this.baseURL}category/${this.category.parentId}`).then((parentResponse) => {
            this.parentCategoryName = parentResponse.data.name
          })
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
