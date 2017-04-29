<template>
  <div class="container-fluid">
    <div class="row">
      <sidebar></sidebar>

      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './shared/Sidebar.vue'

export default {
  name: 'AuthLayout',
  components: { Sidebar }
}
</script>

<style>
  .main {
    padding: 20px;
  }
  @media (min-width: 768px) {
    .main {
      padding-right: 40px;
      padding-left: 40px;
    }
  }
  .main .page-header {
    margin-top: 0;
  }
</style>
