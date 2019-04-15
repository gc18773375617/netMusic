<template>
	<div class="app">
		<div class="seach_box">
			<div class="seach_border">
				<i></i>
				<input @input="sea(msg)" v-model="msg" placeholder="搜索歌曲、歌手、专辑" type="text">
			</div>
		</div>
		<div v-if="!listShow" class="hotBox">
			<h1 v-if="isResult">热门搜索</h1>
			<div v-if="isResult" @click="seaRe(hots.first)" v-for="hots in hotSeach">{{hots.first}}</div>
			<ul v-if="!isResult" class="seach_result">
				<h1>最佳匹配</h1>
				<li @click="openMv(seaMv.id)" v-for="seaMv in seachMv" class="sea_mv">
					<figure>
						<img :src="seaMv.cover" alt="">
					</figure>
					<article>
						<p>MV:{{seaMv.name}}</p>
						<h2>{{seaMv.briefDesc}}</h2>
					</article>
					<i></i>
				</li>
				<li @click="openArt(seaPl.id)" v-for="seaPl in seachPl" class="sea_player">
					<figure>
						<img :src="seaPl.img1v1Url" alt="">
					</figure>
					<article>
						<p>歌手:{{seaPl.name}}</p>
					</article>
					<i></i>
				</li>
				<li @click="openSong(seaSo.id)" v-for="seaSo in seachSo" class="sea_song">
					<div class="mu_newFl">
						<h1>{{seaSo.name}}</h1>
						<p><i></i>{{seaSo.artists[0].name}} - {{seaSo.album.name}}</p>
					</div>
					<div class="mu_newFr">
						<span></span>
					</div>
					<div class="mu_newB"></div>
				</li>
			</ul>
		</div>
		<div v-if="listShow" class="seach_list">
			<h1 @click="seaRe(msg)">搜索"{{msg}}"</h1>
			<div @click="seaRe(songs.name)" v-for="songs in songs">
				<i></i><span>{{songs.name}}</span>
			</div>
		</div>
		<div class="">
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				hotSeach:[],
				listShow:false,
				msg:"",
				jl:false,
				songs:[],
				isResult:true,
				seachMv:[],
				seachPl:[],
				seachSo:[]
			}
		},
		mounted(){
			this.axios.get("http://127.0.0.1:3000/search/hot")
			.then(res=>{
				console.log(res)
				this.hotSeach = res.data.result.hots
			})
			.catch(err=>{
				console.log(err)
			})
		},
		methods: {
			sea(msg) {
				if(this.msg != ""){
					this.listShow = true;
				}else{
					this.listShow = false;
					this.isResult = true;
				}
				if(msg == ""){
					return;
				}
				this.axios.get("http://127.0.0.1:3000/search/suggest?keywords="+msg)
				.then(res=>{
					this.songs = res.data.result.songs
				})
				.catch(err=>{
					console.log(err)
				})
			},
			seaRe(keymsg){
				this.msg = keymsg;
				if(keymsg == ""){
					return;
				}
				this.axios.get("http://127.0.0.1:3000/search/multimatch?keywords="+keymsg)
				.then(res=>{
					console.log(res)
					this.isResult = false;
					this.listShow = false;
					this.seachPl = [];
					this.seachMv = [];
					this.seachPl = res.data.result.artist;
					this.seachMv = res.data.result.mv
				})
				.catch(err=>{
					console.log(err)
				})
				this.axios.get("http://127.0.0.1:3000/search?keywords="+keymsg)
				.then(res=>{
					this.seachSo = (res.data.result.songs).slice(0,10)
				})
				.catch(err=>{
					console.log(err)
				})
			},
			openSong(id){
				this.$router.push({name:'song',query:{"id":id}})
			},
			openArt(id){
				this.$router.push({name:'artist',query:{"id":id}})
			},
			openMv(id){
				this.$router.push({name:'mv',query:{"id":id}})
			}
		},
	}
</script>

<style scoped="scoped">
	.app{
		width: 100%;
		height: 100vh;
		position: fixed;
		overflow-x: hidden;
		overflow-y: auto;
		padding-top: 40px;
	}
	.seach_box{
		padding: 15px 10px;
		border-bottom: 1px solid rgba(0,0,0,.1);
	}
	.seach_border{
		position: relative;
		width: 100%;
		height: 30px;
		padding: 0 30px;
		box-sizing: border-box;
		background: #ebecec;
		border-radius: 30px;
	}
	.seach_border>i{
		position: absolute;
		left: 0;
		top: 9px;
		margin: 0 8px;
		vertical-align: middle;
		display: inline-block;
		vertical-align: middle;
		background-position: 0 0;
		background-size: contain;
		background-repeat: no-repeat;
		width: 13px;
		height: 13px;
		background: url(../static/img/seach.svg);
	}
	.seach_border>input{
		width: 100%;
		height: 30px;
		line-height: 18px;
		border: 0;
		background: transparent;
		font-size: 14px;
		color: #333;
	}
	.hotBox{
		width: 100%;
		padding: 15px 10px 0;
	}
	.hotBox h1{
		font-size: 12px;
		line-height: 17px;
		color: #666;
		margin-bottom: 7px;
	}
	.hotBox>div{
		display: inline-block;
		position: relative;
		height: 32px;
		margin-right: 8px;
		margin-bottom: 8px;
		padding: 0 14px;
		font-size: 14px;
		line-height: 32px;
		color: #333;
	}
	.hotBox>div:before{
		position: absolute;
		z-index: 2;
		content: "";
		top: 0;
		left: 0;
		pointer-events: none;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		border-color: #d3d4da;
		border-radius: 32px;
		transform-origin: top left;
		border: 0 solid rgba(0,0,0,.1);
		border-width: 1px;
	}
	.seach_list{
		width: 100%;
		padding-left: 10px;
	}
	.seach_list>h1{
		width: 100%;
		height: 50px;
		line-height: 50px;
		color: #507daf;
		font-size: 15px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.seach_list>div{
		display: flex;
		align-items: center;
		width: 100%;
		height: 45px;
		line-height: 45px;
	}
	.seach_list>div>i{
		width: 15px;
		height: 15px;
		color: #333;
		background: url(../static/img/seach.svg);
		display: inline-block;
		vertical-align: middle;
		background-position: 0 0;
		background-size: contain;
		background-repeat: no-repeat;
		flex: 0 0 auto;
		margin-right: 7px;
	}
	.seach_list>div>span{
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.seach_result>li{
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.sea_mv,.sea_player{
		display: flex;
		align-items: center;
		height: 66px;
		margin-left: 10px;
		padding: 8px 10px 8px 0;
		box-sizing: border-box;
	}
	.sea_mv>figure{
		position: relative;
		margin: 0;
		width: 89px;
		height: 50px;
		margin-right: 10px;
	}
	.sea_player>figure{
		position: relative;
		margin: 0;
		width: 50px;
		height: 50px;
		margin-right: 15px;
	}
	.sea_mv>figure:before{
		content: "";
		position: absolute;
		z-index: 3;
		top: 50%;
		left: 50%;
		width: 20px;
		height: 20px;
		transform: translate(-50%,-50%);
		background: url(../static/img/play.svg);
	}
	.sea_mv>figure>img,.sea_player>figure>img{
		width: 100%;
		height: 100%;
	}
	.sea_mv>article,.sea_player>article{
		flex: 1;
		width: 1%;
	}
	.sea_mv>article>p,.sea_player>article>p{
		font-size: 17px;
		color: #333333;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: normal;
	}
	.sea_mv>article>h2{
		font-size: 12px;
		line-height: 15px;
		color: #999;
	}
	.sea_mv>i,.sea_player>i{
		width: 8px;
		height: 13px;
		background: url(../static/img/jt.svg);
		margin-right: 8px;
		margin-left: 10px;
	}
	.seach_result>.sea_song{
		padding-left: 10px;
		display: flex;
		position: relative;
		margin-top: 10px;
		border: 0;
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
