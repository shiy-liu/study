<template>
 <v-layout>
     <v-flex md12>
       <table class="elevation-1 table">
         <tr>
           <th v-for="item in headers">{{item.text}}</th>
         </tr>
       </table>
       <table
    class="elevation-1 table2"
  >
      <template  v-for="(item,index) in orders">
       <div v-for="subitem in item" class="container">
      <td>{{subitem.orderId }}</td>
      <td style="text-align:center">{{subitem.receiver }}</td>
      <td>{{ subitem.addressInfo}}</td>
      <td style="text-align:center">{{subitem.goodsList.length}}</td>
       <td style="text-align:center">{{ subitem.orderTotal}}</td>
      <td width="60px;"><img :src="'/static/'+subitem.goodsList[0].productImage" width="100%;" height='60px'></td>
      <td>{{subitem.createDate}}</td>
            <td style="text-align:center">{{ subitem.orderStatus=='1'?'未处理':'已处理'}}</td>
      <td style="text-align:left"><v-btn color="error" small @click="handle(subitem.orderId,subitem.userId,subitem.orderStatus)" :disabled="subitem.orderStatus==0?true:false">处理</v-btn></td>
      </div>
      </template>
  </table>
     </v-flex>
   </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        orders:[],
        headers: [
          { text: '订单编号', value: 'orderId' },
          { text: '收货人', value: 'receiver' },
          { text: '收货地址', value: 'addressInfo' },
          {text:'商品数量',value:''},
          {text:'商品总价' ,value:'orderTotal'},
          {text:'商品列表'},
          { text: '创建日期', value: 'createDate' },
          {text:'是否处理'},
          {text:'操作'}
        ],
        flag:false
    }
  },
  methods:{
        getList(){
             this.$axios.get('/users/orderAdmin',{})
            .then(res=>{
                if(res.data.status=='200'){
                  this.orders=res.data.result
                }
            })
    },
    handle(item,item2,item3,e){
      this.$axios.post('/users/orderAdmin',{id:item,userId:item2})
      .then(res=>{
        if(res.data.status=='200'){
         this.getList()
         e.disabled
        }
      })
    }
  },
  mounted(){
    this.getList()
  }
  }
</script>
<style>
  .table {
    width: 960px;
    height: 60px;
    text-align: left;

  }
  .table tr th{
    width: 50px;
  }
  .table2 .container td{
    width: 95px;
    text-align: left;
  }
</style>