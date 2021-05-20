<template>
  <div class="hello">
    <h3>{{ msg }}</h3>   
  </div>
</template>

<script>
export default {
  name: 'PostComponent',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
