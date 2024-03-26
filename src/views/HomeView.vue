<template>
  <div id="home">
    <!-- Page Wrapper -->
    <div
      id="background-div"
      class="page-holder bg-cover d-flex align-items-center justify-content-center"
    >
      <div class="container text-center text-red">
        <header class="py-5">
          <h1 id="main-title" class="display-3 font-weight-bold text-shadow mb-3">
            Explore Simple Coding Market
          </h1>
          <h2 id="sub-title" class="h4 font-italic text-shadow mb-4">
            A Learning Platform for Aspiring Ecommerce Developers
          </h2>
          <p id="content" class="lead bg-dark p-3 rounded shadow">
            Dive into the world of ecommerce development with our hands-on educational platform.
            Featuring comprehensive resources for web and Android, Simple Coding Market is your
            sandbox for innovation and learning.
          </p>
        </header>
      </div>
    </div>
  </div>
</template>

<style>
.page-holder {
  min-height: 100vh;
}

.bg-cover {
  background-size: cover !important;
  background-position: center !important;
}

#background-div {
  background-image: url('https://source.unsplash.com/featured/?marketplace'); /* Example Unsplash image */
  background-repeat: no-repeat;
}

#main-title {
  color: #f8f9fa;
  font-family: 'Roboto', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

#sub-title {
  color: #dee2e6;
  font-family: 'Josefin Sans', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

#content {
  opacity: 0.9;
  font-size: 1.1rem;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.lead {
  font-size: 1rem;
}

/* Responsive text alignment */
@media (max-width: 768px) {
  .text-center {
    text-align: center !important;
  }
}
</style>
