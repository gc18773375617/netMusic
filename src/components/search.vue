<template>
	<div class="app">
		<div class="seach_box">
			<div class="seach_border">
				<i></i>
				<input placeholder="" type="text">
				<label></label>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		mounter(){
			
		}
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
</style>
