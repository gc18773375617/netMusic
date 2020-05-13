<template>
	<div class="app">
		<div class="videoBox">
			<video autoplay="autoplay" controls="controls" v-if="videoShow" :src="videoSrc"></video>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				videoSrc:"",
				videoShow:true
			}
		},
		mounted() {
			var mv_id = this.$router.currentRoute.query.id;
			this.axios.get("http://121.42.15.67:3000/mv/url?id="+mv_id)
			.then(res=>{
				this.videoSrc = res.data.data.url;
			})
			.catch(err=>{
				console.log(err)
			});
		}
	}
</script>

<style scoped="scoped">
	.app{
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: hidden;
		overflow-y: auto;
		box-sizing: border-box;
	}
	.videoBox{
		width: 100%;
		height: 100%;
	}
	.videoBox>video{
		width: 100%;
		height: 100%;
	}
</style>
