<script>
	import CardLeftInfo from "./CardLeftInfo.svelte";
	import CardRightInfo from "./CardRightInfo.svelte";
	export let toogleSelect = () => {};
	export let isSelected = false;
	export let statusObj = {};
	export let buttons = [];
	export let cardData;
	const { Nombre, Tribu, ["Correo electrónico"]: email, Rol } = cardData;
</script>

<style>
	.card {
		width: 450px;
		height: 220px;
		background-color: #fff;
		background: linear-gradient(#f8f8f8, #fff);
		box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
		border-radius: 6px;
		overflow: hidden;
		position: relative;

		margin: auto;
	}

	.card h1 {
		text-align: center;
	}

	.card .additional {
		position: absolute;
		width: 150px;
		height: 100%;
		background: linear-gradient(#de685e, #ee786e);

		transition: width 0.4s;
		overflow: hidden;
		z-index: 2;
	}

	.card .unCheck {
		background: linear-gradient(#777777, #747474);
	}

	.card:hover .additional {
		width: 100%;
		border-radius: 0 5px 5px 0;
	}

	.card .additional .more-info h1 {
		color: #fff;
		margin-bottom: 0;
	}

	.card .additional .coords span + span {
		float: right;
	}

	.card .general {
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

<div class="card" on:click={toogleSelect}>
	<div class="additional " class:unCheck={isSelected}>
		<CardLeftInfo {statusObj} />
		<CardRightInfo {buttons} name={Nombre} {email} />
	</div>

	<div class="general">
		<h1 class="f4 ">{Nombre}</h1>
		<p class="tl">
			{#if Tribu}

		
			Pertenece a la tribu
			<span class="b">{Tribu}</span>
			{#if Rol} con el rol de <span class="b">{Rol}.</span>{/if}
		{:else}
			<h5>

			Error: Tribu desconocida, compruebe que en el excel aparece la columna <span class="red">Tribu</span>  escrita exactamente así y sin ningún caracter especial, como por ejemplo, . o : al terminar la palabra. 

			</h5>
	{/if}
		</p>
	</div>
</div>
