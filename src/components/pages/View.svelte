<script>
	import Selector from "./../atoms/Selector.svelte";
	import Grid from "./../organisms/Grid.svelte";
	import Charts from "./../molecules/Charts.svelte";
	import Searchbar from "./../organisms/Searchbar.svelte";

	let toggleMenu = "personas";
	const selectorToogle = (id) => (toggleMenu = id);

	let selectors = [
		{ id: "personas", title: "PERSONAS", onClick: selectorToogle },
		{ id: "metricas", title: "MÉTRICAS", onClick: selectorToogle },
	];
</script>

<Selector {selectors} />

{#if toggleMenu == 'personas'}
	<Searchbar />
	<Grid />
{:else if toggleMenu == 'metricas'}
	<Charts />
{/if}
