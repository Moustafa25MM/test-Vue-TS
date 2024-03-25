<template>
  <div class="navbar">
    <div class="navbar-brand">
      <a href="/listproducts">Products</a>
    </div>
    <div class="navbar-toggle" @click="toggleNavbar">☰</div>
    <div class="navbar-menu" :class="{ 'is-active': navbarActive }">
      <div class="navbar-start">
        <a href="/home" class="navbar-item is-active">Home</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarActive: false
    }
  },
  methods: {
    toggleNavbar() {
      this.navbarActive = !this.navbarActive
    }
  }
}
</script>

<style scoped>
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
