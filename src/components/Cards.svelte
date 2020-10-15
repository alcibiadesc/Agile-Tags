<script>
    import CardUnit from "./CardUnit.svelte";
    import { items } from "./../stores/answerStore.js";
    import { searchStore } from "../stores/searchStore.js";

    let listItems = $items || [];

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    $: listFiltered = listItems.filter(
        (item) =>
            removeAccents(item.Tribu.toLowerCase()).includes(
                removeAccents($searchStore.toLowerCase())
            ) ||
            removeAccents(item.Nombre.toLowerCase()).includes(
                removeAccents($searchStore.toLowerCase())
            )
    );

    $: listCrop = listFiltered.map((item, i, array) => {
        delete item.ID;
        delete item["Hora de finalización"];
        delete item["Hora de inicio"];

        return array;
    });
</script>

{#each listFiltered as item, i}
    <CardUnit
        name={item.Nombre}
        tribal={item.Tribu}
        email={item['Correo electrónico']}>
        {#each Object.keys(item) as key}
            {#if key == 'Correo electrónico'}
                <p />
            {:else if key == 'Nombre'}
                <p />
            {:else if key == 'Tribu'}
                <p />
            {:else}
                <div class="mt3 ph3 pt2 pb2 shadow-5">
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
            {/if}
        {/each}
    </CardUnit>
{/each}
