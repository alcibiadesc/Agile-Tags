<script>
	import Selector from "./../atoms/selector.svelte";
	import Grid from "./../organisms/Grid.svelte";
	import Charts from "./../molecules/Charts.svelte";
	import Searchbar from "./../organisms/Searchbar.svelte";

	let toggleMenu = "personas";
	const selectorToogle = (id) => (toggleMenu = id);

	let selectors = [
		{ id: "personas", title: "PERSONAS", onClick: selectorToogle },
		{ id: "metricas", title: "MÉTRICAS", onClick: selectorToogle },
	];

	$: searchValue = "";
</script>

<Selector {selectors} />

{#if toggleMenu == 'personas'}
	<Searchbar
		bind:value={searchValue}
		placeholder="Buscar por nombre o Tribu..." />
	<Grid {searchValue} />
{:else if toggleMenu == 'metricas'}
	<Charts />
{/if}
