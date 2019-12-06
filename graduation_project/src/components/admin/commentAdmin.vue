<!--  -->
<template>
<div>
   <v-layout>
     <v-flex md10>
       <v-data-table
    :headers="headers"
    :items="comments"
    class="elevation-1"
    style="width:960px;"
  >
    <template v-slot:items="props">
      <td>{{ props.item.userId }}</td>
      <td>{{ props.item.userName }}</td>
      <td>{{ props.item.messageText}}</td>
      <td>{{props.item.time | timeformat}}</td>
      <td><v-btn color="success" small @click="flag=true;message=props.item.messageText;_id=props.item._id">修改</v-btn><v-btn color="error" small @click="drop(props.item._id)">删除</v-btn></td>
    </template>
  </v-data-table>
     </v-flex>
   </v-layout>
  <v-dialog
      v-model="flag"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          修改内容
        </v-card-title>

        <v-card-text>
        <v-textarea
          name="input-7-1"
          label="留言内容更改中..."
          v-model="message"
        ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="flag= false;message=''"
          >
            关闭
          </v-btn>
           <v-btn
            color="primary"
            flat
            @click="updated()"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
export default {
  data () {
    return {
      headers: [
          { text: '用户ID', value: 'userId' },
          { text: '姓名', value: 'name' },
          { text: '留言内容', value: 'text' },
          { text: '留言时间', value: 'time' },
          {text:'操作'}
        ],
        comments:[],
        flag:false,
        message:'',
          snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 3000,
        text: '',
        _id:''
        
    };
  },
  mounted(){
    this.getTable()
  },
  filters: {
    timeformat(value) {
      if (!value) return ''
      return value.substr(0,19)
    }
  },
  methods:{
      getTable(){
      this.$axios.get('/users/commentAdmin',{})
      .then(res=>{
        this.comments=res.data.result
      })
    },
    drop(item){
      this.$axios.delete('/users/commentAdmin',{data:{_id:item}})
      .then(res=>{
       if(res.data.status=='200'){
          this.snackbar=true;
         this.text='删除成功！'
         this.getTable()
       }
      })
    },
    updated() {
      this.$axios.post('/users/commentAdmin',{message:this.message,_id:this._id})
      .then(res=>{
       if(res.data.status=='200'){
          this.snackbar=true;
         this.text='修改成功！'
         this.flag=false
         this.getTable()
       }
       else{
        this.snackbar=true;
         this.text='修改失败！'
         this.flag=false
       }
      })
    },
  }
}

</script>
<style scoped>
</style>