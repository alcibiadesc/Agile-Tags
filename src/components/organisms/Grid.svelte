<script>
	import Card from "./Card.svelte";
	import { items } from "./../../stores/answerStore.js";
	import { v4 as uuidv4 } from "uuid";

	let listItems = $items || [];

	export let searchValue = "";

	const normalize = (str) =>
		str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();

	// Pendiente refactorizar esta parte, debido a un bug se utiliza FilterCSS para hacer un display none en lugar de cambiar la bbdd dado que se superponia info
	$: filter = listItems.filter((data) => {
		let query = normalize(searchValue);
		let tribu = data.Tribu ? normalize(data.Tribu) : (data.Tribu = "");
		let nombre = data.Nombre
			? normalize(data.Nombre)
			: (data.Nombre = "anónimo " + data.ID);
		return nombre.includes(query) || tribu.includes(query);
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

	const filterCSS = (name, tribe, query) => {
		query = normalize(query);
		tribe = normalize(tribe);
		name = normalize(name);

		return query == ""
			? ""
			: name.includes(query)
			? ""
			: tribe.includes(query)
			? ""
			: "hide";
	};
</script>

<style>
	.hide {
		display: none;
	}
</style>

{#each listItems as itemData, index (uuidv4())}
	<div class={filterCSS(itemData.Nombre, itemData.Tribu, searchValue)}>
		<Card
			cardData={itemData}
			answers={listItems[index]}
			{index}
			groupByColor={groupByColor(Object.keys(itemData))}
			{arrayColors} />
	</div>
{/each}
