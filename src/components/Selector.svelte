<script>
    import { Vertical, Polar } from "./Charts";
    import Cards from "./Cards.svelte";

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
    <div class="mh5 tc ph3-ns">
        <div class="cf ph2-ns">
            <div class="fl w-100 w-50-ns pa2">
                <Vertical />
            </div>
            <div class="fl w-100 w-50-ns pa2">
                <Polar />
            </div>
        </div>
    </div>
{/if}
