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
			<ul class="seach_result">
				<h1>最佳匹配</h1>
				<li class="sea_player">
					<figure>
						<img src="" alt="">
					</figure>
					<article>
						歌手:有可为
					</article>
				</li>
				<li class="sea_mv"></li>
				<li class="sea_song"></li>
			</ul>
		</div>
		<div v-if="listShow" class="seach_list">
			<h1>搜索"{{msg}}"</h1>
			<div v-for="songs in songs">
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
				isResult:true
			}
		},
		mounted(){
			this.axios.get("/api/search/hot")
			.then(res=>{
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
				}
				this.axios.get("/api/search/suggest?keywords="+msg)
				.then(res=>{
					console.log(res)
					this.songs = res.data.result.songs
				})
				.catch(err=>{
					console.log(err)
				})
			},
			seaRe(keymsg){
				this.axios.get("/api/search/multimatch?keywords="+keymsg)
				.then(res=>{
					console.log(res)
				})
				.catch(err=>{
					console.log(err)
				})
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
		line-height: 12px;
		color: #666;
		margin-bottom: 10px;
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
</style>
