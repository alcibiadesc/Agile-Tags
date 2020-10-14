<script>
    import { items } from "../stores.js";
    let listItems = $items || [];
    let visible = false;
    // Search

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // let searchbar = "a";

    // let listFiltered = listItems.filter((i) =>
    //     removeAccents(i.Name.toLowerCase()).includes(
    //         removeAccents(searchbar.toLowerCase())
    //     )
    // );

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
</script>

<style>
    .invisible {
        display: none;
    }
</style>

<input
    type="text"
    class="w-60"
    placeholder="buscar por nombre o tribu..."
    bind:value={searchbar} />

<div>
    {#each listFiltered as item, i}
        <article class=" center mw7  br3 hidden ba b--black-10 mv4">
            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3 tl">
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
                    <div class="ma4" class:invisible={toggleVisible}>
                        <p class="b">{key}:</p>
                        <p>{item[key]}</p>
                    </div>
                {/each}
            </div>
        </article>
    {/each}
</div>
