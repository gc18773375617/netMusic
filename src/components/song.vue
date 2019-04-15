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
		<div class="songL">
			<ul class="songL_ul">
				<li v-for="value in lrc">{{value}}</li>
			</ul>
		</div>
		<div class="songCon">
			<div class="songCen">
				<div class="btn">
					<a class="prev" href="javascript:;"></a>
					<a @click="getDeg" :class="playBtnClass" href="javascript:;"></a>
					<a class="nxt" href="javascript:;"></a>
				</div>
				<div class="pbar">
					<div @click="conJd" class="songBar">
						<div class="songJd">
							<span></span>
						</div>
					</div>
					<div class="netTime">
						<em>{{nowTime}}</em> / {{duTime}}
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
				"playBtnClass":"playing",
				"nowTime":"00:00",
				"duTime":"xx:xx",
				"songTime":"",
				"inver":null,
				"lrc":[],
				"lrcTime":[],
				"lrcNum":0,
				"lrcinve":""
			}
		},
		mounted() {
			this.$store.commit("changeShow");
			clearInterval(this.inver);
			clearInterval(this.lrcinve);
			const songId = this.$router.currentRoute.query.id;
			this.axios.get("http://127.0.0.1:3000/song/url?id="+songId)
			.then(res=>{
				this.songSrc = res.data.data[0].url
			})
			.catch(err=>{
				console.log(err)
			});
			this.axios.get("http://127.0.0.1:3000/song/detail?ids="+songId)
			.then(res=>{
				this.backCss.backgroundImage = "url("+res.data.songs[0].al.picUrl+")";
				this.backShow = true;
				this.imgSrc = res.data.songs[0].al.picUrl;
				this.song = res.data.songs[0].al;
				this.auth = res.data.songs[0].ar[0];
				const aud = document.getElementById("songPlay");
				setTimeout(()=>{
					this.getcur();
					this.inver = setInterval(this.auPlay,1000);
					this.songTime = document.getElementById("songPlay").duration
					this.lrcinve = setInterval(this.lrcRoll,100)
				},800);
			})
			.catch(err=>{
				console.log(err)
			});
			this.axios.get("http://127.0.0.1:3000/lyric?id="+songId)
			.then(res=>{
				var ly = res.data.lrc.lyric;
				var regR = /\r/g;
				var regN = /\n/g;
				ly = ly.replace(regR,"\\r").replace(regN,"\\n");
				ly = ly.split("\\n")
				var str = /\[[\d\D]*\]/.exec(ly[1])
				ly.forEach((item,i)=>{
					this.lrcTime[i] = /\[[\d\D]*\]/.exec(item);
					if((this.lrcTime[i])!= null){
						this.lrcTime[i] = ((this.lrcTime[i])[0]).slice(1,-1);
						this.lrcTime[i] = Number(((this.lrcTime[i]).split(":"))[0]*60)+Number(((this.lrcTime[i]).split(":"))[1])
					}
					this.lrc[i] = item.replace(/\[[\d\D]*\]/g,"");
				});
			})
			.catch(err=>{
				console.log(err)
			});
		},
		destroyed:function(){
			clearInterval(this.inver);
			clearInterval(this.lrcinve);
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
			},
			auPlay(){
				var audio = document.getElementById("songPlay");
				this.nowTime = parseInt(audio.currentTime/60)+":"+parseInt(audio.currentTime%60)
				document.getElementsByClassName("songJd")[0].style.width = ((audio.currentTime/audio.duration)*100)+"%";
			},
			getcur(){
				this.duTime = parseInt(document.getElementById("songPlay").duration/60)+":"+parseInt(document.getElementById("songPlay").duration%60);
			},
			conJd(el){
				const dio = document.getElementById("songPlay");
				const ele = (window.getComputedStyle(document.getElementsByClassName("songBar")[0]).width).slice(0,-2)
				document.getElementsByClassName("songJd")[0].style.width = el.offsetX/ele+"%";
				if(dio.currentTime > this.songTime*(el.offsetX/ele)){
					var backTime = this.songTime*(el.offsetX/ele);
					this.lrcNum = 0;
					for(var i=0;i< this.lrcTime.length;i++){
						if(backTime <= this.lrcTime[i]){
							this.lrcNum = i;
							break;
						}
					}
				}
				dio.currentTime = this.songTime*(el.offsetX/ele);
			},
			lrcRoll(){
				const currtime = document.getElementById("songPlay").currentTime;
				if((currtime >= (this.lrcTime[this.lrcNum+1]))||this.lrcTime[this.lrcNum] == null||this.lrcTime[this.lrcNum] == undefined||this.lrcTime[this.lrcNum] ==""||isNaN(this.lrcTime[this.lrcNum])){
					this.lrcNum++;
				}
				document.getElementsByClassName("songL_ul")[0].style.top = "-"+50*this.lrcNum+"px";
				(document.getElementsByClassName("songL_ul")[0].children)[this.lrcNum-1].className = "";
				(document.getElementsByClassName("songL_ul")[0].children)[this.lrcNum].className = "songl_select";
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
		width:100%;
		height: 100%;
		margin: auto;
	}
	.btn{
		padding-top: 12px;
		width: 31.3%;
		height: 100%;
		float: left;
		position: relative;
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
		position: absolute;
		left: 3px;
		top: 16px;
		margin: auto;
	}
	.btn>.played{
		width: 36px;
		height: 36px;
		margin-top: 0;
		background-position: -40px -204px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -15px 0 0 -18px;
	}
	.btn>.playing{
		width: 36px;
		height: 36px;
		margin-top: 0;
		background-position: -40px -165px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -15px 0 0 -18px;
	}
	.btn>.nxt{
		background-position: -80px -130px;
		position: absolute;
		right: 3px;
		top: 16px;
		margin: auto;
	}
	.pbar{
		width: 63%;
		height: 100%;
		padding-top: 26px;
		float: right;
		margin-right: 7px;
	}
	.songBar{
		width: 100%;
		height: 9px;
		position: relative;
		background: url(../static/img/statbar.png)no-repeat 0 9999px;
		background-position: 0 0;
		background-size: 100% 1288.88%;		
	}
	.songJd{
		width: 1%;
		height: 100%;
		background: url(../static/img/statbar.png)no-repeat 0 9999px;
		background-position: left -66px;
		position: relative;
	}
	.songJd>span{
		position: absolute;
		top: -7px;
		right: -13px;
		width: 22px;
		height: 24px;
		margin-left: -11px;
		background: url(../static/img/iconall.png)no-repeat;
		background-position: 0 -250px;
	}
	.netTime{
		position: absolute;
		font-size: 12px;
		bottom: 2px;
		right: 7px;
		color: #797979;
		text-shadow: 0 1px 0 #121212;
	}
	.netTime>em{
		color: #a1a1a1;
		font-size: 12px;
	}
	.songL{
		width: 100%;
		padding: 0 35px;
		height: 100px;
		margin-top: 14px;
		position: relative;
		overflow: hidden;
	}
	.songL_ul{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0.5s; 
	}
	.songL_ul>li{
		    width: 100%;
		height: 50px;
		font-size: 16px;
		color: rgba(255,255,255,0.6);
		text-align: center;
		line-height: 25px;
		padding-bottom: 8px;
		overflow: hidden;
	}
	.songL_ul>.songl_select{
		color: #FFFFFF;
	}
</style>
