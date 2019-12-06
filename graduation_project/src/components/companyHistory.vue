<template>
<div class="history">
  <div class="block">百星沿革</div>
  <v-timeline>
    <v-timeline-item
      v-for="(year, i) in years"
      :key=i
      :color="year.color"
      small
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${year.color}--text`"
          v-text="year.year"
        ></span>
      </template>
      <div class="py-3">
        <div>
         {{year.content}}
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</div>
</template>
<script>
  export default {
    data: () => ({
      years: []
    }),
    mounted(){
      this.$axios.get('/companys/about/history')
      .then(res=>{
        this.years=res.data.result
      })
    }
  }
</script>
<style scoped>

.block {
    margin: 20px 0;
    width: 100%;
    padding-left: 15px;
    height: 24px;
    background-color:#aaa;
    color:#fff;
}
</style>