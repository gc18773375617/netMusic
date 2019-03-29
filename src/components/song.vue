<template>
	<div class="songBox">
		<audio id="songPlay" style="display: none;" autoplay="autoplay" :src="songSrc" controls="controls"></audio>
		<div v-if="backShow" :style="backCss" class="backImg"></div>
		<div class="disc_box">
			<em @click="getDeg"></em>
			<div class="disc">
				<div id="roll" :class="netClass">
					<img :src="imgSrc" alt="">
				</div>
			</div>
			<i v-show="netPlay"></i>
		</div>
		<div class="songInfo">
			<h1>《{{song.name}}》 - {{auth.name}}</h1>
		</div>
		<div class="songCon">
			<div class="songCen">
				<div class="btn">
					<a class="prev" href="javascript:;"></a>
					<a @click="getDeg" :class="playBtnClass" href="javascript:;"></a>
					<a class="nxt" href="javascript:;"></a>
				</div>
				<div class="pbar">
					<div class="songBar">
						<div class="songJd">
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				songSrc:"",
				backCss:{
					"backgroundImage":"",
					"backgroundSize":"100% 100%"
				},
				"backShow":false,
				imgSrc:"",
				"netPlay":false,
				"netClass":"disc_img",
				"song":{},
				"auth":[],
				"playBtnClass":"playing"
			}
		},
		mounted() {
			const songId = this.$router.currentRoute.query.id;
			setTimeout(()=>{
				this.axios.get("/api/song/url?id="+songId)
				.then(res=>{
					this.songSrc = res.data.data[0].url
				})
				.catch(err=>{
					console.log(err)
				});
				this.axios.get("/api/song/detail?ids="+songId)
				.then(res=>{
					this.backCss.backgroundImage = "url("+res.data.songs[0].al.picUrl+")";
					this.backShow = true;
					this.imgSrc = res.data.songs[0].al.picUrl;
					this.song = res.data.songs[0].al;
					this.auth = res.data.songs[0].ar[0];
				})
				.catch(err=>{
					console.log(err)
				});
				this.axios.get("/api/lyric?id="+songId)
				.then(res=>{
					console.log(res)
				})
				.catch(err=>{
					console.log(err)
				})
			},500)
			console.log(document.getElementById('songPlay').duration)
		},
		methods: {
			getDeg(el) {
				// console.log(document.defaultView.getComputedStyle(document.getElementById('roll'), null).transform)
				if(this.netPlay == false){
					this.netPlay = true;
					// document.getElementById('roll').style.transform = document.defaultView.getComputedStyle(document.getElementById('roll'), null).transform
					document.getElementById('songPlay').pause();
					this.playBtnClass = "played"
				}else{
					document.getElementById('songPlay').play();
					this.netPlay = false;
					this.playBtnClass = "playing"
				}
			}
		},
	}
</script>

<style>
	.songBox{
		position: fixed;
		width: 100%;
		height: 100vh;
	}
	.backImg{
		width: 100%;
		height: 100%;
		position: fixed;
		transform: scale(1.5);
		filter:blur(4px);
		z-index: -1;
		top: 0;
		left: 0;
	}
	.backImg:before{
		content: "";
		position: absolute;
		width: 100%;
		height: 100vh;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0,0,0,.5);
	}
	.disc_box{
		width: 100%;
		padding-top: 70px;
		position: relative;
	}
	.disc_box>em{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 77;
	}
	.disc_box>i{
		width: 56px;
		height: 56px;
		background: url(../static/img/play.png)no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -0px 0 0 -28px;
	}
	.disc_box:before{
		content: "";
		position: absolute;
		width: 96px;
		height: 137px;
		top: 0px;
		left: 163px;
		background: url(../static/img/needle-ip6.png)no-repeat;
		background-size: 100% 100%;
		z-index: 9;
	}
	.disc{
		width: 296px;
		height: 296px;
		position: relative;
		background: url(../static/img/disc.png)no-repeat;
		background-size: 100% 100%;
		margin: auto;
	}
	.disc_img{
		width: 184px;
		height: 184px;
		margin: -92px 0 0 -92px;
		position: absolute;
		top: 50%;
		left: 50%;
		overflow: hidden;
		border-radius: 100%;
	}
	.roll{
		animation:  20s linear infinite roll;
	}
	.disc_img>img{
		width: 100%;
		height: 100%;
	}
	@keyframes roll{
		from{transform: rotate(0deg);}
		to{transform: rotate(1turn);}
	}
	.songInfo{
		padding: 0 35px;
		margin-top: 25px;
	}
	.songInfo>h1{
		text-align: center;
		font-size: 18px;
		line-height: 1.1;
		color: #fefefe;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.songCon{
		width: 100%;
		height: 53px;
		position: absolute;
		bottom: 0;
		left: 0;
		background-position: 0 0;
		background-repeat: repeat-x;
		background: url(../static/img/playbar.png);
		z-index: 10;
	}
	.songCen{
		width:750px;
		height: 100%;
		margin: auto;
	}
	.btn{
		padding-top: 12px;
		width: 116px;
	}
	.btn>a{
		display: block;
		float: left;
		width: 28px;
		height: 28px;
		margin-right: 8px;
		margin-top: 5px;
		text-indent: -9999px;
		background: url(../static/img/playbar.png)no-repeat;
	}
	.btn>.prev{
		background-position: 0 -130px;
	}
	.btn>.played{
		width: 36px;
		height: 36px;
		margin-top: 0;
		background-position: -40px -204px;
	}
	.btn>.playing{
		width: 36px;
		height: 36px;
		margin-top: 0;
		background-position: -40px -165px;
	}
	.btn>.nxt{
		background-position: -80px -130px;
	}
	.pbar{
		width: 627px;
		height: 100%;
		float: right;
	}
	.songBar{
		width: 493px;
		height: 9px;
		position: relative;
		background-position: right 0;
		background: url(../static/img/statbar.png)no-repeat 0 9999px;
	}
</style>
