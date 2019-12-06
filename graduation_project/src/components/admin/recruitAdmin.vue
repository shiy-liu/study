<!--  -->
<template>
  <div>
    <v-layout>
        <v-flex md3 offset-md1>
        <v-select
          :items="items"
          label="招聘方式"
          v-model="selected"
          @change="getList()"
        ></v-select>
      </v-flex>
      <v-flex md3>
      </v-flex>
       <v-flex md2>
        <v-btn   color="primary" @click="add">
      <v-icon dark>add</v-icon>
      添加
    </v-btn>
      </v-flex>
    </v-layout>
   <v-layout>
     <v-flex md10>
       <v-data-table
    :headers="headers"
    :items="recruit"
    class="elevation-1"
    style="width:960px;"
  >
    <template v-slot:items="props">
      <td>{{ props.item.workPlace }}</td>
      <td>{{ props.item.recruitmentPosition }}</td>
      <td v-for="subitem in props.item.jobResponsibilities">{{subitem}}</td>
      <td v-show="props.item.jobResponsibilities.length<4?true:false"></td>
      <td><v-btn color="success" small @click="handleUpdate(props.item)">修改</v-btn><v-btn color="error" small @click="drop(props.item.reId)">删除</v-btn></td>
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
          修改招聘信息
        </v-card-title>

        <v-card-text>
           <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12
        >
          <v-text-field
            v-model="temp.workPlace"
            label="工作地点（招聘人数）"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
  <v-layout>
     <v-flex
          xs12
        >
          <v-text-field
            v-model="temp.recruitmentPosition"
            label="招聘岗位"
            required
          ></v-text-field>
        </v-flex>
  </v-layout>
  <v-layout>
        <v-flex
          xs12
         v-show="!addOption" 
        >
          <v-text-field
            v-model="temp.jobResponsibilities[index]"
            :label="'岗位要求'+(index+1)"
            required
            v-for="(item,index) in temp.jobResponsibilities" :key="index"
          ></v-text-field>
        </v-flex>
   <v-flex
          xs12
          v-show="addOption"
        >
          <v-text-field
            v-model="temp.jobResponsibilities[index]"
            :label="'岗位要求'+(index+1)"
            required
            v-for="(item,index) in 4" :key="index"
          ></v-text-field>
        </v-flex>
  </v-layout>
    </v-container>
  </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="flag=false;"
          >
            关闭
          </v-btn>
           <v-btn
            color="primary"
            flat
            @click="updated()"
            v-show="!addOption"
          >
            修改
          </v-btn>
              <v-btn
            color="primary"
            flat
            @click="created()"
            v-show="addOption"
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
      items:['校园招聘','社会招聘','海外招聘'],
      temp:{
        reId:'',
        workPlace:'',
        recruitmentPosition:'',
        jobResponsibilities:[]
      },
      selected:'',
      recruit:[],
       headers: [
          { text: '工作地点（招聘人数）', value: 'userId' },
          { text: '招聘岗位', value: 'name' },
          { text: '岗位要求1', value: 'email' },
          { text: '岗位要求2', value: 'email' },
          { text: '岗位要求3', value: 'email' },
          { text: '岗位要求4', value: 'email' },
          {text:'操作'}
        ],
          snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 3000,
        text: '',
        flag:false,
        addOption:false
    };
  },

mounted(){
    this.getList()
  },
  methods:{
    getList(){
      let go=''
      go=this.selected=='校园招聘'?'school':this.selected=='社会招聘'?'social':this.selected=='海外招聘'?'overseas':'school'
      this.$axios.get('/recruitments/'+go)
      .then(res=>{
       this.recruit=res.data.result
      })
    },
      drop(item){
      let go=this.selected=='校园招聘'?'school':this.selected=='社会招聘'?'social':this.selected=='海外招聘'?'overseas':'school'
      this.$axios.delete('/users/'+go+'/recruitAdmin',{data:{reId:item}})
      .then(res=>{
       if(res.data.status=='200'){
          this.snackbar=true;
         this.text='删除成功！'
         this.getList()
       }
      })
    },
   handleUpdate(item) {
    this.flag=true;
    this.temp = Object.assign({},item) 
    console.log(this.temp);
   }, 
   updated(){
      let go=this.selected=='校园招聘'?'school':this.selected=='社会招聘'?'social':this.selected=='海外招聘'?'overseas':'school'
      this.$axios.post('/users/'+go+'/recruitAdmin',{data:this.temp})
      .then(res=>{
       if(res.data.status=='200'){
          this.snackbar=true;
         this.text='修改成功！'
         this.flag=false
         this.getList()
       }
      })
    },
    add(){
      console.log(1111);
      this.flag=true
      this.addOption=true;
       this.temp={
        reId:'',
        workPlace:'',
        recruitmentPosition:'',
        jobResponsibilities:[]
      }
    },
    created(){
    let go=this.selected=='校园招聘'?'school':this.selected=='社会招聘'?'social':this.selected=='海外招聘'?'overseas':'school'
      this.$axios.post('/users/'+go+'/recruitAdmin1',{data:this.temp})
      .then(res=>{
       if(res.data.status=='200'){
          this.snackbar=true;
         this.text='添加成功！'
         this.flag=false
         this.getList()
       }
      })
    }
  }
}

</script>
<style scoped>
</style>