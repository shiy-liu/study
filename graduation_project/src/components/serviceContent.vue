<!--  -->
<template>
<div ref="cont">
  <div class="cont" v-show="!flag">
    <ul>
      <li v-for="item in content">
        <h5 style="color:#2386C9;margin-bottom:10px;">{{item.title}}</h5>
        <p>{{item.body}}</p>
      </li>
    </ul>
  </div>
   <div class="cont" v-show="flag">
   <p v-for="item in content" style="font-size:16px;color:orange">
     <a :href='"static/"+item.body' :download='item.body'>{{item.title}}</a>
   </p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      flag:false
    };
  },
  methods:{
      show(){
        
      }
  },
  props:['content']
}

</script>
<style scoped>
.cont {
  padding: 30px 20px;
}
</style>