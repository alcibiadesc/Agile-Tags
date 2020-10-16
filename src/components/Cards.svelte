<script>
    import { moderateStore } from "./../stores/moderateStore.js";
    import CardUnit from "./CardUnit.svelte";
    import { items } from "./../stores/answerStore.js";
    import { searchStore } from "../stores/searchStore.js";

    let listItems = $items || [];

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    $: listFiltered = listItems.filter((item) =>
        item.Tribu
            ? removeAccents(item.Tribu.toLowerCase()).includes(
                  removeAccents($searchStore.toLowerCase())
              )
            : item.Nombre
            ? removeAccents(item.Nombre.toLowerCase()).includes(
                  removeAccents($searchStore.toLowerCase())
              )
            : listItems
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
                <div class="mt3 ph3 pt2 pb2 shadow-5 bg-white">
                    <p class="b">{key}</p>
                    <p>{item[key]}</p>

                    <div class="cf">
                        <p class="f6 green fl w-50">
                            Puntuación:
                            {$moderateStore[i][key] ? $moderateStore[i][key] : 0}
                        </p>

                        <p class=" f6 tr mb1 fl w-50">
                            <input type="number" placeholder="Moderar" />
                        </p>
                        <p />
                    </div>
                </div>
            {/if}
        {/each}
    </CardUnit>
{/each}
