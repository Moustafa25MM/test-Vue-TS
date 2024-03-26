<template>
  <div class="navbar">
    <div class="navbar-group">
      <router-link
        to="/listproducts"
        class="navbar-brand"
        :class="{ 'is-active': isActive('/listproducts') }"
        >Products</router-link
      >
      <router-link
        to="/categories"
        class="navbar-brand"
        :class="{ 'is-active': isActive('/categories') }"
        >Categories</router-link
      >
    </div>
    <div class="navbar-toggle" @click="toggleNavbar">☰</div>
    <div class="navbar-menu" :class="{ 'is-active': navbarActive }">
      <router-link to="/home" class="navbar-item">Home</router-link>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const navbarActive = ref(false)
    const route = useRoute()

    const toggleNavbar = () => {
      navbarActive.value = !navbarActive.value
    }

    const isActive = (routePath) => {
      return route.path === routePath
    }

    // Watch for route changes to update the active state
    watch(
      () => route.path,
      (newPath) => {
        navbarActive.value = false // Close the navbar on route change if needed
      }
    )

    return { navbarActive, toggleNavbar, isActive }
  }
}
</script>

<style scoped>
.navbar-group {
  display: flex;
  align-items: center;
}

/* Highlight the active navbar-brand */
.navbar-brand.is-active {
  color: #3273dc; /* Active color, change as desired */
  font-weight: bold;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
}

.navbar-brand {
  font-size: 1.5rem;
}

.navbar-toggle {
  display: none;
  cursor: pointer;
}

.navbar-menu {
  display: flex;
}

.navbar-item {
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease-in-out;
}

.navbar-item:hover,
.navbar-item.is-active {
  background-color: #e2e6ea;
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    width: 100%;
    flex-direction: column;
  }
  .navbar-menu.is-active {
    display: flex;
  }
  .navbar-toggle {
    display: initial;
  }
}
</style>
