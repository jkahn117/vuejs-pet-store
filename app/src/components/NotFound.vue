<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 error">
        <h1>Oops!</h1>
        
        <h2>404 - Not Found</h2>

        <div class="row">
          <p class="col-md-12">
            Sorry, we have encountered an error. Requested page not found.
          </p>
        </div>

        <div class="row">
          <div class="col-md-12">
            <router-link to="/" class="btn btn-lg btn-primary">
              <span class="glyphicon glyphicon-home"></span>
              Home
            </router-link>
            <a href="#" class="btn btn-lg btn-default">
              <span class="glyphicon glyphicon-envelope"></span>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .error {
    padding: 40px 15px;
    text-align: center;
  }

  .error > .row {
    margin: 2rem;
  }

  .error .btn {
    margin-right: 2rem;
  }
</style>
