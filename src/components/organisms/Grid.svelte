<script>
	import CardUnit from "./CardUnit.svelte";
	import { items } from "./../../stores/answerStore.js";
	import Moderar from "./../molecules/Moderar.svelte";
	let listItems = $items || [];

	export let searchValue = "";

	const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();  


	$: filter = listItems.filter(
		({Tribu, Nombre}) => {
			let query = normalize(searchValue); 
			let tribu = normalize(Tribu); 
			let nombre = normalize(Nombre); 
			return tribu.includes(query) || nombre.includes(query); 
		}  

	)


	$: listCrop = filter.map((item, _, array) => {
		delete item.ID;
		delete item["Hora de finalización"];
		delete item["Hora de inicio"];

		return array;
	});

	// Colors

	$: arrayColors = [];

	const groupByColor = (ele) => {
		let counter = 0;
		let arrayColorCollection = [];
		const checkColor = ele.map((item, index) => {
			if (ele[index + 1]) {
				let result =
					item.substring(0, 5) == ele[index + 1].substring(0, 5)
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



{#each filter as item, i}
	<CardUnit
		cardData = {item}
		answers={filter[i]}
		index={i}
		groupByColor={groupByColor(Object.keys(item))}>
		{#each Object.keys(item) as key, index}
			{#if key == 'Correo electrónico'}
				<p />
			{:else if key == 'Nombre'}
				<p />
			{:else if key == 'Tribu'}
				<p />
			{:else}
				<Moderar {key} {item} {i} {index} {arrayColors} />
			{/if}
		{/each}
	</CardUnit>


{/each}
