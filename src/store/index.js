import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	headShow:true
}
const mutations = {
	changeShow(stu){
		state.headShow = !state.headShow
	}
}
const store = new Vuex.Store({
	state,
	mutations
})
export default store;