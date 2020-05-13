<template>
	<div class="artist">
		<div class="art_body">
			<div class="art_head">
				<img :src="ali.picUrl" alt="">
				<p>{{ali.name}}({{ali.alias[0]}})</p>
			</div>
			<div class="art_content">
				<p :class="p_class">{{ali.briefDesc}}</p>
				<span @click="content_op" :class="jt_class"></span>
			</div>
			<h2 class="m_title">热门50单曲</h2>
			<ul class="mu_new">
				<li @click="openSong(songs.id)" v-for="songs,index in hotSong">
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
				ali:{},
				p_class:"",
				jt_class:"u_down",
				hotSong:[]
			}
		},
		mounted() {
			const artId = this.$router.currentRoute.query.id;
			this.axios.get("http://121.42.15.67:3000/artists?id="+artId)
			.then(res=>{
				console.log(res)
				this.ali = res.data.artist;
				this.hotSong = res.data.hotSongs
			})
			.catch(err=>{
				console.log(err)
			})
		},
		methods:{
			content_op(){
				if(this.p_class == ""){
					this.p_class = "art_clamp"
					this.jt_class = "u_up"
				}else{
					this.p_class = ""
					this.jt_class = "u_down"
				}
			},
			openSong(id){
				this.$router.push({name:'song',query:{"id":id}})
			}
		}
	}
</script>

<style scoped="scoped">
	.artist{
		width: 100%;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		position: fixed;
	}
	.art_head{
		position: relative;
		height: 255px;
		overflow: hidden;
	}
	.art_head>img{
		width: 100%;
	}
	.art_head>p{
		position: absolute;
		left: 15px;
		right: 15px;
		bottom: 5px;
		z-index: 3;
		color: #fff;
		font-size: 17px;
	}
	.art_content{
		padding: 10px 15px 18px;
		background: #FFFFFF;
		position: relative;
	}
	.art_content>p{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		font-size: 14px;
		color: #666666;
		line-height: 19px;
	}
	.art_content>.art_clamp{
		-webkit-line-clamp: inherit;
	}
	.art_content>span{
		position: absolute;
		bottom: 3px;
		right: 15px;
		z-index: 3;
		width: 15px;
		height: 15px;
	}
	.art_content>.u_down{
		background: url(../static/img/download.png);
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: 12px auto;
	}
	.art_content>.u_up{
		background: url(../static/img/up.png);
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: 12px auto;
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
