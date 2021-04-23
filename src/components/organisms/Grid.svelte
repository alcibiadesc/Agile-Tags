<script>
	import Card from "./Card.svelte";
	import { items } from "./../../stores/answerStore.js";
	import { v4 as uuidv4 } from 'uuid';

	let listItems = $items || [];

	export let searchValue = "";

	const normalize = (str) =>
		str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();

	$: filter = listItems.filter((data) => {
		let query = normalize(searchValue);
		let tribu = normalize(data.Tribu);
		let nombre = data.Nombre ? normalize(data.Nombre) : "anónimo" ;
		return nombre.includes(query) || tribu.includes(query) ;
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

{#each filter as itemData, index (uuidv4())}
	<div>
		<Card
			cardData={itemData}
			answers={filter[index]}
			{index}
			groupByColor={groupByColor(Object.keys(itemData))}
			{arrayColors} />
	</div>
{/each}
