<template>
  <div id="app">
	  <transition name="fade">
		  <ul id="head_ul" v-if="isShow">
		  	<li v-for="tit in titleData">
		  		<div @click="netClass(tit)" :class="active == tit.index?'tabtxt tit':'tabtxt'"><em>
		  	<router-link :to="tit.netUrl">{{tit.name}}</router-link>
		  	</em></div></li>
		  </ul>
	  </transition>
		<transition :name="transitionName">
			<router-view/>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
	  return{
		  titleData:[
			  {"index":'1',"name":"推荐音乐","netUrl":"/"},
			  {"index":'2',"name":"热门","netUrl":"/hot"},
			  {"index":'3',"name":"搜索","netUrl":"/sea"},
			  {"index":'4',"name":"我的","netUrl":"/login"}
		  ],
		  active:"1",
		  "transitionName":"trun-on",
		  "isShow":true,
		  "animo":"slide-down"
	  }
  },
  methods:{
	  netClass(item){
		  this.active = item.index
	  }
  },
  watch:{
	  '$route'(to, from){
		  this.active = to.meta.index
		if(to.meta.index == 77||to.meta.index == 78||to.meta.index == 79){
			this.isShow = false
		}else{
			this.isShow = true
		}
		if(from.meta.index > to.meta.index){
  			this.transitionName = 'turn-off'
  		}else{
  			this.transitionName = 'turn-on'
  		}
		if(to.meta.index == 77 || from.meta.index == 77){
			this.transitionName = 'sdf'
		}
	  }
  },
  mounted(){
	  if(this.$route.meta.index == 77||this.$route.meta.index == 78||this.$route.meta.index == 79){
		  this.isShow = false
	  }else{
		  this.isShow = true;
	  }
	  if(this.$route.meta.index <= 4){
		  this.active = this.$route.meta.index;
	  }
  }
}
</script>

<style scoped="scoped">
	ul{
		width: 100%;
		height: 40px;
		position: fixed;
		top: 0;
		left: 0;
		border-bottom: 1px solid rgb(204,204,204);
		background: white;
		z-index: 99;
	}
	ul>li{
		float: left;
		width: 25%;
		line-height: 40px;
		text-align: center;
	}
	.tabtxt{
		display: inline-block;
		max-width: 100%;
		height: 100%;
		padding: 0 5px;
		box-sizing: border-box;
	}
	.tit{
		position: relative;
	}
	.tit>em>a{
		color: #D33A31;
	}
	.tit:before{
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0px;
		left: 0;
		background-color: #d33a31;
	}
	.tabtxt>em{
		    text-overflow: ellipsis;
				white-space: nowrap;
	}
	/* 页面跳转动画 */
	.turn-on-enter {
	transform: translate3d(100%, 0, 0);
	}
	.turn-on-leave-to {
	transform: translate3d(-100%, 0, 0); 
	}
	.turn-on-enter-active,
	.turn-on-leave-active {
	transition: transform 0.4s ease;
	}
	.turn-off-enter {
	transform: translate3d(-100%, 0, 0); 
	}
	.turn-off-leave-to {
	transform: translate3d(100%, 0, 0);
	}
	.turn-off-enter-active,
	.turn-off-leave-active {
	transition: transform 0.4s ease;
	}
	.turn-off-leave-active {
	z-index: 2;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>
