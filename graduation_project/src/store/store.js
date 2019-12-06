import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        nickName:'',
        // cartCount:0
    },
    mutations:{
        upadteUserInfo(state,nickName){
            state.nickName=nickName

        },
        // upadteCartCount(state,cartCount){
        //     state.cartCount+=cartCount
        // }
    }
  })