<template>
	<div class="songBox">
		<audio style="display: none;" autoplay="autoplay" :src="songSrc" controls="controls"></audio>
		<div v-if="backShow" :style="backCss" class="backImg"></div>
		<div class="disc_box">
			<div class="disc">
				<div id="roll" @click="getDeg" :class="netClass">
					<img :src="imgSrc" alt="">
				</div>
			</div>
			<i v-show="netPlay"></i>
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
				"netClass":"disc_img roll"
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
				})
				this.axios.get("/api/song/detail?ids="+songId)
				.then(res=>{
					this.backCss.backgroundImage = "url("+res.data.songs[0].al.picUrl+")";
					this.backShow = true;
					this.imgSrc = res.data.songs[0].al.picUrl;
				})
				.catch(err=>{
					console.log(err)
				})
			},500)
		},
		methods: {
			getDeg(e) {
				console.log(document.defaultView.getComputedStyle(document.getElementById('roll'), null).transform)
				if(this.netClass == "disc_img roll"){
					this.netClass = "disc_img"
					this.netPlay = true;
					e.target.style.transform = document.defaultView.getComputedStyle(document.getElementById('roll'), null).transform
				}else{
					this.netClass = "disc_img roll";
					this.netPlay = false;
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
</style>
