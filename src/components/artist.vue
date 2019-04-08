<template>
	<div class="app">
		<div class="art_head">
			<img :src="alias.img1v1Url" alt="">
			<p></p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				alias:{}
			}
		},
		mounted() {
			const artId = this.$router.currentRoute.query.id;
			this.axios.get("/api/artists?id="+artId)
			.then(res=>{
				console.log(res)
				this.alias = res.data.artist
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style>
</style>
