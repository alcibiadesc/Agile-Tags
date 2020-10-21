<script>
    import CardUnit from "./CardUnit.svelte";
    import { items } from "./../stores/answerStore.js";
    import { searchStore } from "../stores/searchStore.js";
    import Moderar from "./Moderar.svelte";
    let listItems = $items || [];

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    $: listFiltered = listItems.filter(
        (item) =>
            (item.Tribu
                ? removeAccents(item.Tribu.toLowerCase()).includes(
                      removeAccents($searchStore.toLowerCase())
                  )
                : listItems) ||
            (item.Nombre
                ? removeAccents(item.Nombre.toLowerCase()).includes(
                      removeAccents($searchStore.toLowerCase())
                  )
                : listItems)
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
        email={item['Correo electrónico']}
        rol={item.Rol}
        answers={listFiltered[i]}
        index={i}>
        {#each Object.keys(item) as key}
            {#if key == 'Correo electrónico'}
                <p />
            {:else if key == 'Nombre'}
                <p />
            {:else if key == 'Tribu'}
                <p />
            {:else}
                <Moderar {key} {item} {i} />
            {/if}
        {/each}
    </CardUnit>
{/each}
