<template>
	<div class="songBox">
		<audio style="display: none;" autoplay="autoplay" :src="songSrc" controls="controls"></audio>
		<div v-if="backShow" :style="backCss" class="backImg"></div>
		
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
				"backShow":false
			}
		},
		mounted() {
			// console.log(this.$router.currentRoute.query.id);
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
					this.backShow = true
				})
				.catch(err=>{
					console.log(err)
				})
			},500)
		},
		watch:{
			'$route'(to,form){
				console.log(1)
			}
		}
	}
</script>

<style>
	.songBox{
		position: fixed;
		width: 100%;
		height: 100vh;
		padding-top: 40px;
	}
	.backImg{
		width: 100%;
		height: 100%;
		position: fixed;
		transform: scale(1.5);
		filter:blur(4px);
		z-index: 1;
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
</style>
