<template>
  <div id="app">
		<ul>
			<li v-for="tit in titleData">
				<div @click="netClass(tit)" :class="active == tit.index?'tabtxt tit':'tabtxt'"><em>
			<router-link :to="tit.netUrl">{{tit.name}}</router-link>
			</em></div></li>
		</ul>
    <router-view/>
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
		  active:"1"
	  }
  },
  methods:{
	  netClass(item){
		  this.active = item.index
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
		height: 1px;
		bottom: 1px;
		left: 0;
		background-color: #d33a31;
	}
	.tabtxt>em{
		    text-overflow: ellipsis;
				white-space: nowrap;
	}
</style>
