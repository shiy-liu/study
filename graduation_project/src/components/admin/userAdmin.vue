<!--  -->
<template>
<div>
   <div id="main" style="width: 800px;height:400px;"></div>
   <v-layout>
     <v-flex md10>
       <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.userId }}</td>
      <td>{{ props.item.userName }}</td>
      <td>{{ props.item.email}}</td>
      <td>{{props.item.createDate}}</td>
      <td><v-btn color="error" small @click="drop(props.item._id)">注销</v-btn></td>
    </template>
  </v-data-table>
     </v-flex>
   </v-layout>
  <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      color="green"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
    </v-snackbar>
</div>
</template>

<script>
import echarts from "echarts";
export default {
  data () {
    return {
      chart:'',
      xData:[],
      yData:[],
      users:[],
        headers: [
          { text: '用户ID', value: 'userId' },
          { text: '姓名', value: 'name' },
          { text: '邮箱地址', value: 'email' },
          { text: '注册日期', value: 'createDate' },
          {text:'操作'}
        ],
       snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 3000,
        text: '',
        option:{}
     
    };
  },

   methods: {
    getList(){
             this.$axios.get('/users/userAdmin',{})
            .then(res=>{
                if(res.data.status=='200'){
            let _this=this
            res.data.result.forEach(item => {
              _this.xData.push(item._id+'月')
              _this.yData.push(item.number)
            });
                }
          this.chart= echarts.init(document.getElementById("main"));
            this.option={
				title: {
					text: '每月用户注册人数'
				},
				tooltip: {},
				legend: {
					data:['人数']
				},
				xAxis: {
					data: this.xData
				},
				yAxis: {},
				series: [{
					name: '人数',
					type: 'line',
					data: this.yData
				}]
			}
          this.chart.setOption(this.option)
            })
    },
    getTable(){
      this.$axios.get('/users/userAdminTab',{})
      .then(res=>{
        this.users=res.data.result
      })
    },
    drop(item){
      this.$axios.post('/users/userAdminTab',{id:item})
      .then(res=>{
       if(res.data.status=='200'){
         this.snackbar=true;
         this.text='删除成功！'
         this.getTable()
       }
      })
    }
  },
  mounted() {
     this.getList()
    this.getTable()
  },
  
 }


</script>
<style scoped>
</style>