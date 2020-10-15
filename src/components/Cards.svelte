<script>
    import Charts from "./Charts.svelte";
    import { items } from "../stores.js";
    let listItems = $items || [];

    // Search

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    console.log(listItems);

    $: searchbar = "";
    $: listFiltered = listItems.filter(
        (item) =>
            removeAccents(item.Tribu.toLowerCase()).includes(
                removeAccents(searchbar.toLowerCase())
            ) ||
            removeAccents(item.Nombre.toLowerCase()).includes(
                removeAccents(searchbar.toLowerCase())
            )
    );

    let toggleVisible = true;

    let toggleMenu = "Personas";
</script>

<style>
    .invisible {
        display: none;
    }

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
</style>

<article class="cf f7 ma4 noselect">
    <div
        on:click={() => {
            toggleMenu = 'Personas';
        }}
        class=" grow link fl w-50 bg-near-white tc">
        <h1>PERSONAS</h1>
    </div>
    <div
        on:click={() => (toggleMenu = 'Graficos')}
        class="grow link fl w-50 bg-light-gray tc">
        <h1>GRAFICOS</h1>
    </div>
</article>

{#if toggleMenu == 'Personas'}
    <input
        type="text"
        class="w-60"
        placeholder="buscar por nombre o tribu..."
        bind:value={searchbar} />

    <div>
        {#each listFiltered as item, i}
            <article class=" center mw7  br3 hidden ba b--black-10 mv4">
                <h1
                    class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3 tl">
                    PO:
                    {item.Nombre}
                    | {item.Tribu}

                    <input
                        class="fr"
                        type="checkbox"
                        checked
                        id="visible"
                        name="visible" />
                </h1>
                <div class="tl pa3 bt b--black-10">
                    <p class="f6 f5-ns lh-copy measure">
                        {item['Correo electrónico']}
                    </p>

                    <div class="">
                        <button
                            on:click={() => {
                                toggleVisible = !toggleVisible;
                            }}>ver más información...</button>
                    </div>
                    {#each Object.keys(item) as key}
                        <div
                            class="mt3 ph3 pt2 pb2 shadow-5"
                            class:invisible={toggleVisible}>
                            <p class="b">{key}:</p>
                            <p>{item[key]}</p>

                            <p class=" f6 tr mb1">
                                <select name="moderar" id="moderar">
                                    <option value="Moderar">Moderar</option>
                                    <option value="0">0</option>
                                    <option value="0,25">0,25</option>
                                    <option value="0,50">0,50</option>
                                    <option value="0,75">0,75</option>
                                    <option value="1">1</option>
                                </select>
                            </p>
                            <p />
                        </div>
                    {/each}
                </div>
            </article>
        {/each}
    </div>
{:else}
    <Charts />
{/if}
