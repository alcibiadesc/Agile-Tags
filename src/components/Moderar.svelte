<script>
	import { moderateStore } from "../stores/moderateStore.js";
	export let key;
	export let item;
	export let i;

	const isPair = () => {
		let result = Number(key.substring(4, 5)) % 2 == 0 ? true : false;
		console.log(result);
		return result;
	};
</script>

<style>
	.pair {
		background-color: #ffbdbd;
	}
</style>

<div class="mt3 ph3 pt2 pb2 shadow-5 bg-white" class:pair={isPair()}>
	<p class="b">{key}</p>
	<p>{item[key]}</p>

	<div class="cf">
		<p class="f6 green fl w-50">
			Puntuación:
			{$moderateStore[i][key] ? $moderateStore[i][key] : 0}
		</p>

		<p class=" f6 tr mb1 fl w-50">
			<select bind:value={$moderateStore[i][key]}>
				<option value={$moderateStore[i][key]}>Moderar</option>
				<option value={0}>0</option>
				<option value={0.25}>0,25</option>
				<option value={0.5}>0,50</option>
				<option value={0.75}>0,75</option>
				<option value={1}>1.00</option>
			</select>
		</p>
		<p />
	</div>
</div>
