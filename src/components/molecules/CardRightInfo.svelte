<script>
	import CardButtons from "./CardButtons.svelte"; 


	export let name = "hola";
	export let email = "xx";
	export let tribal = "y"; 
	export let rol = "n"; 
	export let buttons = [];
</script>

<style>


	.additional .more-info {
		width: 300px;
		float: left;
		position: absolute;
		left: 150px;
		height: 100%;
	}

	.card .additional .more-info h1 {
		color: #fff;
		margin-bottom: 0;
	}

	.card .additional .coords span + span {
		float: right;
	}

	.additional .stats {
		font-size: 2rem;
		display: flex;
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		top: auto;
		color: #fff;
	}

	.additional .stats > div {
		flex: 1;
	}

	.general {
		width: 300px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
		box-sizing: border-box;
		padding: 1rem;
		padding-top: 0;
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
		<div class="general">
			<h1 class="f4 ">{name}</h1>
			<p class="tl">
				Pertenece a la tribu
				<span class="b">{tribal}</span>
				{#if rol}
					con el rol de <span class="b">{rol}.</span>
				{/if}
			</p>
		</div>
