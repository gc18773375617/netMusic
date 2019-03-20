<template>
  <div id="app">
		<ul>
			<li><div class="tabtxt"><em>推荐</em></div></li>
			<li><div class="tabtxt"><em>热门</em></div></li>
			<li><div class="tabtxt"><em>搜索</em></div></li>
			<li><div class="tabtxt"><em>我的</em></div></li>
		</ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
	.tabtxt>em{
		    text-overflow: ellipsis;
				white-space: nowrap;
	}
</style>
