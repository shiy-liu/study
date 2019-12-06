<template>
    <section class="bread">
        <div class="bread-wrap">
            <nav class="">
                <a href="/">
                    首页
                </a>
                <slot></slot>
            </nav>
        </div>
    </section>
</template>
<style>
  .bread{
      height: 40px;
      line-height: 40px;
      background-color: #f0f0f0;
      margin-top:10px;
  }
  .bread-wrap{
      padding: 0 5px;
      font-size: 14px;
      color: #a1a1a1;
  }
  .bread-wrap a{
    position: relative;
      margin-right: 20px;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0px;
      content:'/';
      height:20px;
      line-height: 20px;
  }
  .bread-wrap span{
      color:#d1434a;
  }
</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
