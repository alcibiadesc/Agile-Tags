<script>
	export let onClick= () => {};
</script>


<style>
	.float-btn {
		position: fixed;
		width: 60px;
		height: 60px;
		bottom: 40px;
		right: 40px;
		padding-top: 15px;
		background-color: #53adb2;
		color: #fff;
		border-radius: 50px;
		text-align: center;
		box-shadow: 2px 2px 3px #999;
	}
</style>

<div
	on:click={onClick}
	class="float-btn grow ">
		<img src="icons/save.svg" alt="save">
</div>
