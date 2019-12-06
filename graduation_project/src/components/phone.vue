<!-- 电话客服 -->
<template>
  <v-layout>
      <v-flex md6 offset-md3>
          <p class="title text-md-center">
              欢迎您的致电！
          </p>
       <p class="text-md-center"> <v-icon large color="green darken-2">contact_phone</v-icon><span>客服：400 066 9379</span>
          </p>
       <p class="text-md-center"> <v-icon color="blue darken-2" large>phone</v-icon><span>总机：+86 10 63436699</span></p>
      </v-flex>
  </v-layout>
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
.text-md-center {
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>