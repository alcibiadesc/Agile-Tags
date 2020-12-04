<script>
	import CardButtons from "./../molecules/CardButtons.svelte";
	export let buttons = [];
	export let name = "";
	export let email = "";
</script>

<style>
	.stats > div {
		flex: 1;
	}

	.stats {
		font-size: 2rem;
		display: flex;
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		top: auto;
		color: #fff;
	}

	.more-info {
		width: 300px;
		float: left;
		position: absolute;
		left: 150px;
		height: 100%;
	}

	.more-info h1 {
		color: #fff;
		margin-bottom: 0;
	}

	a {
		text-decoration-color: none;
		color: white;
	}
</style>

<div class="more-info">
	<h1 class="f4 ">{name}</h1>
	<CardButtons {buttons} />

	<div class="stats">
		<div>
			<div class="tr">
				<span class="f6 mt1 tr">
					<a href={`mailto:${email}`}>{email ? email : ''}</a></span>
			</div>
		</div>
	</div>
</div>
