<!--  -->
<template>
  <div class="promble">
      <router-link class="text-pro" tag="div" to="/feedbackAndPhone">有问题?戳我</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
}

</script>
<style scoped>
.promble {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: #4a4a4a;
}
.text-pro {
    border: 1px solid #fff;
    color: #fff;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
}
</style>