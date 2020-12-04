<script>
	export let value = "";
	export let placeholder = "";
</script>

<style>
	@import url("https://fonts.googleapis.com/css?family=Raleway:400,700,900");

	/* Base styling */
	.search__container {
		padding-top: 30px;
	}

	.search__input {
		width: 100%;
		padding: 12px 24px;
		background-color: transparent;
		transition: transform 250ms ease-in-out;
		font-size: 14px;
		line-height: 18px;
		color: #575756;
		background-color: transparent;
		background-image: url(/icons/search.svg);
		background-repeat: no-repeat;
		background-size: 18px 18px;
		background-position: 95% center;
		border-radius: 50px;
		border: 1px solid #575756;
		transition: all 250ms ease-in-out;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.search__input::placeholder {
		color: rgba(87, 87, 86, 0.8);
		letter-spacing: 1.5px;
	}

	.search__input:hover,
	.search__input:focus {
		padding: 12px 0;
		outline: 0;
		border: 1px solid transparent;
		border-bottom: 1px solid #575756;
		border-radius: 0;
		background-position: 100% center;
	}

	.centered {
		margin: auto;
		width: 40%;
		padding: 10px;
	}
</style>

<div class="mb4">
	<div class="search__container  centered m">
		<input class="search__input" type="text" {placeholder} bind:value />
	</div>
</div>
