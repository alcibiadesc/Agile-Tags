<script>
	import { moderateStore } from "../stores/moderateStore.js";
	export let key;
	export let item;
	export let i;
	let isPair;

	// tag

	import { axisStore } from "./../stores/axisStore.js";
	import {
		productOwner,
		scrumMaster,
		rte,
		tribeLead,
		ttl,
	} from "../AxisBBDD.js";
	import { afterUpdate } from "svelte";
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

	const codesNum = () => {
		let axis = key.substring(0, 1);
		let level = Number(key.substring(2, 3));
		let group = Number(key.substring(4, 6).replace("-", ""));

		let axisToNumber = () => {
			switch (axis) {
				case "A":
					return 1;
					break;

				case "B":
					return 2;
					break;

				case "C":
					return 2;
					break;

				case "D":
					return 1;
					break;

				default:
					break;
			}
		};
		let result = axisToNumber() + level + group;

		return result;
	};

	$: selectValue = "";
</script>

<style>
	.red {
		background-color: #ffdfdf;
		color: #000000;
	}

	.blue {
		background-color: #96ccff;
		color: #000000;
	}

	.green {
		background-color: #e8fdf5;
		color: #000000;
	}

	.yellow {
		background-color: #fffceb;
		color: #000000;
	}
</style>

<div
	class="mt3 ph3 pt2 pb2 shadow-5 br4 bg-white"
	class:red={codesNum() % 4 == 0 ? true : false}
	class:green={codesNum() % 4 == 1 ? true : false}
	class:blue={codesNum() % 4 == 2 ? true : false}
	class:yellow={codesNum() % 4 == 3 ? true : false}>
	<div>
		<p class="f6 b helvetica fw4 mv3 ">
			{#if key.substring(0, 1) == 'A'}
				{tag[0]}:
			{:else if key.substring(0, 1) == 'B'}
				{tag[1]}:
			{:else if key.substring(0, 1) == 'C'}
				{tag[2]}:
			{:else if key.substring(0, 1) == 'D'}{tag[3]}:{/if}

			{#if key.substring(2, 3) == '1'}
				Participant
			{:else if key.substring(2, 3) == '2'}
				Practitioner
			{:else if key.substring(2, 3) == '3'}Expert{/if}
		</p>
	</div>

	<p class="b">{key}</p>
	<p class="pl2">→ {item[key]}</p>

	<div class="cf">
		<div class="f6 fl w-50">
			<p />
			{#if $moderateStore[i][key] >= 0}
				<p>Puntuación: {$moderateStore[i][key]}</p>
			{/if}
		</div>

		<div class=" f6 tr fl w-50">
			<p>
				Moderar:
				<!-- svelte-ignore a11y-no-onchange -->
				<select
					name="moderator"
					bind:value={selectValue}
					on:change={() => {
						$moderateStore[i][key] = selectValue;
					}}>
					<option value={''} selected disabled>-</option>
					<option value={0}>0</option>
					<option value={0.25}>0,25</option>
					<option value={0.5}>0,50</option>
					<option value={0.75}>0,75</option>
					<option value={1}>1</option>
				</select>
			</p>
		</div>
		<p />
	</div>
</div>
