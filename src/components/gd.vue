<template>
	<div class="app">
		<div class="head_box">
			<div :style="headStyle" class="head_bg">
				
			</div>
			<div class="">
				<div class="gd_pic">
					
				</div>
				<div class="gd_name">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				plList:{},
				headStyle:{
					"background":""
				}
			}
		},
		mounted() {
			var gd_id =  this.$router.currentRoute.query.id;
			this.axios.get("/api/playlist/detail?id="+gd_id)
			.then(res=>{
				console.log(res)
				this.plList = res.data.playlist;
				console.log(res.data.playlist.coverImgUrl)
				this.headStyle.background = "url("+res.data.playlist.coverImgUrl+")";
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style>
	.app{
		width: 100%;
		height: 100vh;
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
</style>
