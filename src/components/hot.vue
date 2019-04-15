<template>
	<div class="app">
		<div class="hot_banner">
			<div class="hot_pic">
				<div class="hot_banContent"></div>
				<p>更新日期 : {{uPTime}}</p>
			</div>
		</div>
		<ul class="mu_new">
			<li @click="openSong(songs.id)" v-for="songs,index in songP">
				<div class="hot_num hot_red">
					{{(index+1)<10?"0"+(index+1):(index+1)}}
				</div>
				<div class="mu_newFl">
					<h1>{{songs.al.name}}</h1>
					<p><i></i>{{songs.ar[0].name}} - {{songs.al.name}}</p>
				</div>
				<div class="mu_newFr">
					<span></span>
				</div>
				<div class="mu_newB"></div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				songP:[],
				uPTime:""
			}
		},
		mounted(){
			this.axios.get("http://106.13.61.56:3000/top/list?idx=1")
			.then(res=>{
				var ctime = new Date(res.data.playlist.trackUpdateTime)
				this.uPTime = ctime.getMonth()+1+"月"+ctime.getDay()+"日";
				this.songP = res.data.playlist.tracks;
				this.songP = this.songP.slice(0,10);
			})
			.catch(err=>{
				console.log(err)
			})
		},
		methods: {
			openSong(id){
				this.$router.push({name:'song',query:{"id":id}})
			}
		},
	}
</script>

<style scoped="scoped">
	.app{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		position: fixed;
	}
	.hot_banner{
		width: 100%;
		padding-top: 38.9%;
		position: relative;
		background: url(../static/img/hot_banner.jpg)no-repeat;
		background-size: 100% 100%;
		margin-top: 40px;
	}
	.hot_pic{
		position: absolute;
		display: flex;
		padding-left: 20px;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		top: 0;
		left: 0;
	}
	.hot_banContent{
		width: 142px;
		height: 67px;
		background: url(../static/img/index_icon_2x.png)no-repeat;
		background-size: 166px 97px;
		background-position: -24px -30px;
	}
	.hot_pic>p{
		margin-top: 10px;
		font-size: 12px;
		color: hsla(0,0%,100%,.8);
		transform: scale(.91);
		transform-origin: left top;
	}
	.mu_new{
		width: 100%;
		float: left;
	}
	.mu_new>li{
		padding-left: 10px;
		display: flex;
		position: relative;
		margin-top: 10px;
	}
	.mu_new>li>img{
		height: 100%;
	}
	.mu_newFl{
		flex: 1 1 auto;
	}
	.mu_newFl>h1{
		font-size: 17px;
	}
	.mu_newFl>p{
		font-size: 12px;
		color: #888;
	}
	.mu_newFl>p>i{
		display: inline-block;
		width: 12px;
		height: 8px;
		margin-right: 4px;
		background: url(../static/img/index_icon_2x.png);
		background-size: 166px 97px;
	}
	.mu_newFr{
		display: flex;
		align-items: center;
		padding: 0 10px;
	}
	.mu_newFr>span{
		display: inline-block;
		width: 22px;
		height: 22px;
		background: url(../static/img/index_icon_2x.png);
		background-size: 166px 97px;
		background-position: -24px 0;
	}
	.mu_newB{
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,.1);
		position: absolute;
		bottom: -5px;
		left: 0;
		margin-left: 38px;
	}
	.hot_num{
		display: flex;
		-ms-flex-align: center;
		align-items: center;
		width: 28px;
		font-size: 17px;
		color: #999;
		line-height: ;
	}
	.hot_red{
		color: #df3436;
	}
</style>
