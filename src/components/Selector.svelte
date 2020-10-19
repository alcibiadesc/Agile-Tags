<script>
    import Cards from "./Cards.svelte";
		import Charts from "./Charts.svelte";
    import Searchbar from "./Searchbar.svelte";
    let toggleMenu = "Personas";
</script>

<article class="cf f7 ma4 noselect">
    <div
        on:click={() => {
            toggleMenu = 'Personas';
        }}
        class=" grow link fl w-50 bg-near-white tc">
        <h1>PERSONAS</h1>
    </div>
    <div
        on:click={() => {
            toggleMenu = 'Metricas';
        }}
        class="grow link fl w-50 bg-light-gray tc">
        <h1>MÉTRICAS</h1>
    </div>
</article>

{#if toggleMenu == 'Personas'}
    <Searchbar />
    <Cards />
{:else if toggleMenu == 'Metricas'}
	<Charts/>
{/if}
