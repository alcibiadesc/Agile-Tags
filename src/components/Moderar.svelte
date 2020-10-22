<script>
	import { moderateStore } from "../stores/moderateStore.js";
	import { axisStore } from "./../stores/axisStore.js";
	import { tag } from "../AxisBBDD.js";
	import { afterUpdate } from "svelte";

	export let key;
	export let item;
	export let i;
	export let arrayColors;
	export let index;

	let colorCode = arrayColors[i][index];
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
	class:red={colorCode % 2 == 0 ? true : false}
	class:green={colorCode % 2 == 1 ? true : false}
	class:blue={colorCode % 4 == 2 ? true : false}
	class:yellow={colorCode % 4 == 3 ? true : false}>
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
