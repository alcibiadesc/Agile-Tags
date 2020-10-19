<script>
    import { axisStore } from "./../stores/axisStore.js";
    import {
        productOwner,
        scrumMaster,
        rte,
        tribeLead,
        ttl,
    } from "../AxisBBDD.js";
    import { afterUpdate } from "svelte";

    export let axisA;
    export let axisB;
    export let axisC;
    export let axisD;

    export let allAxisA;
    export let allAxisB;
    export let allAxisC;
    export let allAxisD;

    export let participantAll;
    export let practitionerAll;
    export let expertAll;

    $: tag = [0, 0, 0, 0];

    afterUpdate(() => {
        switch ($axisStore) {
            case "productOwner":
                tag = productOwner;
                break;
            case "scrumMaster":
                tag = scrumMaster;
                break;

            case "rte":
                tag = rte;
                break;

            case "tribeLead":
                tag = tribeLead;
                break;

            case "ttl":
                tag = ttl;
                break;

            default:
                break;
        }
    });
</script>

<div class="mb4 pb3 pt0 mt0 topindex">
    <div class="overflow-auto">
        <table
            class="f6 w-80 mw8 center bg-white ma2 shadow-5 br3"
            cellspacing="0">
            <thead class="">
                <tr class="stripe-dark ">
                    <th class="fw6 tc pa3 bg-white">AXIS</th>
                    <th class="fw6 tc pa3 bg-white">
                        <strong>Participant</strong>
                    </th>
                    <th class="fw6 tc pa3 bg-white">
                        <strong>Practitioner</strong>
                    </th>
                    <th class="fw6 tc pa3 bg-white"><strong>Expert</strong></th>
                    <th class="fw6 tc pa3 bg-white">Resultado</th>
                </tr>
            </thead>
            <tbody class="lh-copy tc">
                <tr class="stripe-dark">
                    <td class="pa3">{tag[0]}</td>
                    <td class="pa3">{axisA.participant}</td>
                    <td class="pa3">{axisA.practitioner}</td>
                    <td class="pa3">{axisA.expert}</td>
                    <td class="pa3">{allAxisA.toFixed(2)}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3">{tag[1]}</td>
                    <td class="pa3">{axisB.participant}</td>
                    <td class="pa3">{axisB.practitioner}</td>
                    <td class="pa3">{axisB.expert}</td>
                    <td class="pa3">{allAxisB.toFixed(2)}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3">{tag[2]}</td>
                    <td class="pa3">{axisC.participant}</td>
                    <td class="pa3">{axisC.practitioner}</td>
                    <td class="pa3">{axisC.expert}</td>
                    <td class="pa3">{allAxisC.toFixed(2)}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3">{tag[3]}</td>
                    <td class="pa3">{axisD.participant}</td>
                    <td class="pa3">{axisD.practitioner}</td>
                    <td class="pa3">{axisD.expert}</td>
                    <td class="pa3">{allAxisD.toFixed(2)}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3"><strong>Resultado</strong></td>
                    <td class="pa3">
                        <strong>{participantAll.toFixed(2)}</strong>
                    </td>
                    <td class="pa3">
                        <strong>{practitionerAll.toFixed(2)}</strong>
                    </td>
                    <td class="pa3"><strong>{expertAll.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
