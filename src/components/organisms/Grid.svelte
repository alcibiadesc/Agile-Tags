<script>
	import CardUnit from "./CardUnit.svelte";
	import { items } from "./../../stores/answerStore.js";
	let listItems = $items || [];

	export let searchValue = "";

	const normalize = (str) =>
		str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();

	$: filter = listItems.filter(({ Tribu, Nombre }) => {
		let query = normalize(searchValue);
		let tribu = normalize(Tribu);
		let nombre = normalize(Nombre);
		return tribu.includes(query) || nombre.includes(query);
	});

	$: filter.map((item, _, array) => {
		delete item.ID;
		delete item["Hora de finalización"];
		delete item["Hora de inicio"];

		return array;
	});

	// Colors

	$: arrayColors = [];

	const groupByColor = (array) => {
		let counter = 0;
		let arrayColorCollection = [];
		array.map((item, index) => {
			if (array[index + 1]) {
				let result =
					item.substring(0, 5) == array[index + 1].substring(0, 5)
						? counter
						: counter++;
				arrayColorCollection.push(result);
			} else {
				arrayColorCollection.push(counter);
			}
		});
		arrayColors.push(arrayColorCollection);
	};
</script>

{#each filter as item, index}
	<CardUnit
		cardData={item}
		answers={filter[index]}
		{index}
		groupByColor={groupByColor(Object.keys(item))}
		{arrayColors} />
{/each}
