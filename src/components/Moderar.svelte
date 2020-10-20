<script>
	import { moderateStore } from "../stores/moderateStore.js";
	export let key;
	export let item;
	export let i;
	import { axisStore } from "./../stores/axisStore.js";
	import {
		productOwner,
		scrumMaster,
		rte,
		tribeLead,
		ttl,
	} from "../AxisBBDD.js";

	const isPair = () => {
		let axis = key.substring(0, 1);
		let level = Number(key.substring(2, 3));
		let group = Number(key.substring(4, 5));

		let axisToNumber = () => {
			switch (axis) {
				case "A":
					return 1;
					break;

				case "B":
					return 2;
					break;

				case "C":
					return 3;
					break;

				case "D":
					return 4;
					break;

				default:
					break;
			}
		};
		let sumCodes = axisToNumber() + level + group;

		let result = sumCodes % 2 == 0 ? true : false;
		console.log(result);
		return result;
	};

	$: selectValue = 0;

	// Tags

	$: tag = [0, 0, 0, 0];

	afterUpdate(() => {
		switch ($axisStore) {
			case "productOwner":
				tag = productOwner;
				break;
			case "scrumMaster":
				tag = scrumMaster;
				break;

			case "rte":
				tag = rte;
				break;

			case "tribeLead":
				tag = tribeLead;
				break;

			case "ttl":
				tag = ttl;
				break;

			default:
				break;
		}
	});
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

		<h3>Hola</h3>
		<p class=" f6 tr mb1 fl w-50">
			Moderar:
			<!-- svelte-ignore a11y-no-onchange -->
			<select
				name="moderator"
				bind:value={selectValue}
				on:change={() => {
					$moderateStore[i][key] = selectValue;
				}}>
				<option value={0}>0</option>
				<option value={0.25}>0,25</option>
				<option value={0.5}>0,50</option>
				<option value={0.75}>0,75</option>
				<option value={1}>1</option>
			</select>
		</p>
		<p />
	</div>
</div>
