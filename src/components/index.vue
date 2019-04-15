<template>
	<div class="app">
		<h1 class="title">推荐歌单</h1>
		<ul class="gd_ul">
			<div class="gd_line">
				<li @click="openGd(tjgds.id)" v-for="tjgds in tjgd">
					<div>
						<span>{{(tjgds.playCount/10000).toFixed(1)}}万</span>
						<img :src="tjgds.picUrl" alt="">
					</div>
					<p class="gd_js">{{tjgds.name}}</p>
				</li>
			</div>
			<div class="gd_line">
				<li @click="openGd(tjgds.id)" v-for="tjgds in tjgdl">
					<div>
						<span>{{(tjgds.playCount/1000).toFixed(1)}}万</span>
						<img :src="tjgds.picUrl" alt="">
					</div>
					<p class="gd_js">{{tjgds.name}}</p>
				</li>
			</div>
		</ul>
		<h1 class="title">最新音乐</h1>
		<ul class="mu_new">
			<li @click="openSong(newsgs.id)" v-for="newsgs in newsg">
				<div class="mu_newFl">
					<h1>{{newsgs.name}}</h1>
					<p><i></i>{{newsgs.song.album.artists[0].name}} - {{newsgs.name}}</p>
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
	export default{
		data(){
			return{
				tjgd:[],
				tjgdl:[],
				newsg:[]
			}
		},
		mounted() {
			this.axios('http://127.0.0.1:3000/personalized?limit=6')
			.then(res=>{
				this.tjgd.push(res.data.result[0]);
				this.tjgd.push(res.data.result[1]);
				this.tjgd.push(res.data.result[2]);
				this.tjgdl.push(res.data.result[3]);
				this.tjgdl.push(res.data.result[4]);
				this.tjgdl.push(res.data.result[5]);
			})
			.catch(err=>{
				console.log(err)
			});
			this.axios('http://127.0.0.1:3000/personalized/newsong?limit=10')
			.then(res=>{
				this.newsg = res.data.result;
			})
			.catch(res=>{
				console.log(res)
			})
		},
		methods:{
			openSong(id){
				this.$router.push({name:'song',query:{"id":id}})
			},
			openGd(id){
				this.$router.push({name:'gd',query:{"id":id}})
			}
		}
	}
</script>

<style scoped="scoped">
	.app{
		padding-top: 40px;
		position: fixed;
		width: 100%;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.title{
		position: relative;
		padding-left: 9px;
		margin-bottom: 14px;
		font-size: 17px;
		height: 20px;
		line-height: 20px;
		margin-top: 10px;
		float: left;
	}
	.title:before{
		content: "";
		width: 2px;
		height: 16px;
		position: absolute;
		left: 0;
		top: 3px;
		background: #D33A31;
	}
	.gd_ul li{
		width: 33.3%;
		float: left;
		padding: 0 1px 0 1px;
	}
	.gd_ul li img{
		width: 100%;
	}
	.gd_ul li>div{
		position: relative;
	}
	.gd_ul li>div>span{
		position: absolute;
		right: 5px;
		top: 2px;
		z-index: 3;
		padding-left: 13px;
		color: #fff;
		font-size: 12px;
		background-position: 0;
		background-repeat: no-repeat;
		background-size: 11px 10px;
		text-shadow: 1px 0 0 rgba(0,0,0,.15);
		background-image: url(../static/img/erji.svg);
	}
	.gd_ul li>div:before{
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 20px;
		z-index: 2;
		background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent);
	}
	.gd_js{
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		padding: 2px 2px 0 6px;
		line-height: 1.2;
		font-size: 13px;
	}
	.gd_line{
		width: 100%;
		float: left;
		margin-bottom: 16px;
	}
	.gd_line>li:first-child{
		padding-right: 2px;
		padding-left: 0;
	}
	.gd_line>li:last-child{
		padding-left: 2px;
		padding-right: 0;
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
		margin-left: 10px;
	}
</style>
