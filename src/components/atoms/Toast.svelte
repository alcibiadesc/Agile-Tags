<script>
	export let showToast = false;


</script>

<style>
	.hide {
		visibility: hidden;
		max-width: 50px;
		height: 50px;
		/*margin-left: -125px;*/
		margin: auto;
		background-color: #777777;
		color: #fff;
		text-align: center;
		border-radius: 2px;

		position: fixed;
		z-index: 1;
		left: 0;
		right: 0;
		bottom: 30px;
		font-size: 17px;
		white-space: nowrap;
	}
	#toast #img {
		width: 50px;
		height: 50px;

		float: left;

		padding-top: 16px;
		padding-bottom: 16px;

		box-sizing: border-box;

		background-color: #4f4f4f;
		color: #fff;
	}
	#toast #desc {
		color: #fff;

		padding: 16px;

		overflow: hidden;
		white-space: nowrap;
	}

	.show {
		visibility: visible;
		z-index: 10;
		-webkit-animation: fadein 0.5s, expand 0.5s 0.5s, stay 1s 1s, shrink 0.5s 2s,
			fadeout 0.5s 1.5s;
		animation: fadein 0.5s, expand 0.5s 0.5s, stay 1s 1s, shrink 0.5s 4s,
			fadeout 0.5s 1.5s;
	}

	@-webkit-keyframes fadein {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: 30px;
			opacity: 1;
		}
	}

	@keyframes fadein {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: 30px;
			opacity: 1;
		}
	}

	@-webkit-keyframes expand {
		from {
			min-width: 50px;
		}
		to {
			min-width: 250px;
		}
	}

	@keyframes expand {
		from {
			min-width: 50px;
		}
		to {
			min-width: 250px;
		}
	}
	@-webkit-keyframes stay {
		from {
			min-width: 250px;
		}
		to {
			min-width: 250px;
		}
	}

	@keyframes stay {
		from {
			min-width: 250px;
		}
		to {
			min-width: 250px;
		}
	}
	@-webkit-keyframes shrink {
		from {
			min-width: 250px;
		}
		to {
			min-width: 50px;
		}
	}

	@keyframes shrink {
		from {
			min-width: 250px;
		}
		to {
			min-width: 50px;
		}
	}

	@-webkit-keyframes fadeout {
		from {
			bottom: 30px;
			opacity: 1;
		}
		to {
			bottom: 60px;
			opacity: 0;
		}
	}

	@keyframes fadeout {
		from {
			bottom: 30px;
			opacity: 1;
		}
		to {
			bottom: 60px;
			opacity: 0;
		}
	}
</style>

<div id="toast" class="hide" class:show={showToast}>
	<div id="img">
		<img src="icons/copy.svg" alt="copy">
	</div>
	<div id="desc">Información copiada</div>
</div>
