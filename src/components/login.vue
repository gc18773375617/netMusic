<template>
	<div>
		<p>手机号: <input v-model="user" type="text"></p>
		<p>密码 : <input v-model="pass" type="password"></p>
		<button @click="netLogin()">提交</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				user:'',
				pass:''
			}
		},
		mounted() {
			
		},
		methods:{
			netLogin(){
				console.log(this)
				var _self = this
				var params = new URLSearchParams();
				params.append('phone', _self.user);
				params.append('password', _self.pass);
				this.axios({
					method:"post",
					url:"/api/login/cellphone",
					data:params
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
</style>
