<template>
	<div class="app">
		<div class="head_box">
			<div :style="headStyle" class="head_bg">
				
			</div>
			<div class="gd_box">
				<div class="gd_pic">
					<img :src="picUrl" alt="">
					<span>歌单</span>
					<i>{{(plList.playCount/10000).toFixed(1)}}万</i>
				</div>
				<div class="gd_name">
					<h1>{{plList.name}}</h1>
				</div>
			</div>
		</div>
		<div class="gd_intr">
			<div class="gd_tags">
				标签 : <em v-for="value in plList.tags">{{value}}</em>
			</div>
			<p>简介 : {{plList.description}}</p>
		</div>
		<h2 class="m_title">歌曲列表</h2>
		<ul class="mu_new">
			<li @click="openSong(songs.id)" v-for="songs,index in song">
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
	export default{
		data(){
			return{
				plList:{},
				picUrl:"",
				headStyle:{
					"backgroundImage":""
				},
				song:""
			}
		},
		mounted() {
			var gd_id = this.$router.currentRoute.query.id;
			this.axios.get("http://121.42.15.67:3000/playlist/detail?id="+gd_id)
			.then(res=>{
				console.log(res)
				this.plList = res.data.playlist;
				this.picUrl = res.data.playlist.coverImgUrl;
				this.headStyle.backgroundImage = "url("+res.data.playlist.coverImgUrl+")";
				this.song = (res.data.playlist.tracks).slice(0,50)
			})
			.catch(err=>{
				console.log(err)
			})
		},
		methods:{
			openSong(id){
				this.$router.push({name:'song',query:{"id":id}})
			}
		}
	}
</script>

<style>
	.app{
		width: 100%;
		height: 100vh;
		position: fixed;
		overflow: hidden;
		overflow-y: auto;
	}
	.head_box{
		position: relative;
		display: block;
		padding: 30px 10px 30px 15px;
		overflow: hidden;
	}
	.head_bg{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		filter: blur(20px);
		transform: scale(1.5);
	}
	.gd_box{
		position: relative;
		z-index: 2;
		display: flex;
	}
	.gd_pic{
		width: 126px;
		height: 126px;
		position: relative;
	}
	.gd_pic>img{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.gd_pic>span{
		position: absolute;
		z-index: 3;
		top: 10px;
		left: 0;
		padding: 0 8px;
		height: 17px;
		color: #fff;
		font-size: 9px;
		text-align: center;
		line-height: 17px;
		background-color: rgba(217,48,48,.8);
		border-top-right-radius: 17px;
		border-bottom-right-radius: 17px;
	}
	.gd_pic>i{
		position: absolute;
		right: 2px;
		top: 0;
		z-index: 3;
		padding-left: 15px;
		color: #fff;
		font-size: 12px;
		background: url(../static/img/erji.svg);
		background-position: 0;
		background-repeat: no-repeat;
		background-size: 11px 10px;
		text-shadow: 1px 0 0 rgba(0,0,0,.15);
	}
	.gd_pic:before{
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 18px;
		z-index: 2;
		background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.2));
	}
	.gd_name{
		flex: 1 1 auto;
		width: 1%;
		margin-left: 16px;
	}
	.gd_name>h1{
		padding-top: 1px;
		font-size: 17px;
		line-height: 1.3;
		color: #fefefe;
		height: 44px;
		display: -webkit-box;
		-webkit-box-pack: center;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
		white-space: normal;
	}
	.gd_intr{
		width: 100%;
		padding: 10px 10px 18px 15px;
	}
	.gd_tags{
		color: #666666;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.gd_tags>em{
		margin-right: 10px;
		padding: 1px 8px;
		font-size: 12px;
		line-height: 20px;
		border-radius: 9999px;
		border: 1px solid rgba(0,0,0,.1);
	}
	.gd_intr>p{
		font-size: 14px;
		color: #666666;
	}
	.m_title{
		height: 23px;
		line-height: 23px;
		padding: 0 10px;
		font-size: 12px;
		color: #666;
		background-color: #eeeff0;
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
		width: 1%;
	}
	.mu_newFl>h1{
		font-size: 17px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.mu_newFl>p{
		font-size: 12px;
		color: #888;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
