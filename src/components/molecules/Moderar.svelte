<script>
	import { moderateStore } from "../../stores/moderateStore.js";
	import { tag } from "../../AxisBBDD.js";

	export let key;
	export let item;
	export let i;
	export let arrayColors;
	export let index;

	$: selectValue = "";

	const scoreOptions = [0, 0.25, 0.5, 0.75, 1];

	let keyTag = key.substring(0, 1);
	let keyLevel = key.substring(2, 3);

	const tags = {
		A: tag[0],
		B: tag[1],
		C: tag[2],
		D: tag[3],
	};
	const levels = {
		1: "Participant",
		2: "Practitioner",
		3: "Expert",
	};

	let isTag = tags[keyTag];
	let isLevel = levels[keyLevel];

	const colors = {
		0: "red",
		1: "blue",
		2: "green",
		3: "yellow",
	};

	let keyColor = arrayColors[index][i] % 4;
	let isColor = colors[keyColor];

	console.log(arrayColors[index]);
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

<div class="mt3 ph3 pt2 pb2 shadow-5 br4 bg-white {isColor} ">
	<div>
		<p class="f6 b helvetica fw4 mv3 ">{isTag} | {isLevel}</p>
	</div>

	<p class="b">{key}</p>
	<p class="pl2">→ {item[key]}</p>

	<div class="cf">
		<div class="f6 fl w-50">
			<p />
			{#if $moderateStore[index][key] >= 0}
				<p>Puntuación: {$moderateStore[index][key]}</p>
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
					{#each scoreOptions as score}
						<option value={score}>{score}</option>
					{/each}
				</select>
			</p>
		</div>
		<p />
	</div>
</div>
