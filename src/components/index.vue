<template>
  <div>
    <ggl_map></ggl_map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import gglMap from './lib/gglMap'

  Vue.component('ggl_map', gglMap)

  export default{
    name: 'Home'
  }
</script>
