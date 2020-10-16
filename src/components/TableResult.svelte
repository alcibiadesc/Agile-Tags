<script>
    import { Axis } from "./../stores/AxisBBDD.js";

    export let scorePM;
    export let scoreCSM;
    export let scorePD;
    export let scoreRT;
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
                </tr>
            </thead>
            <tbody class="lh-copy tc">
                <tr class="stripe-dark">
                    <td class="pa3">Product Managment</td>
                    <td class="pa3">{scorePM.participant}</td>
                    <td class="pa3">{scorePM.practitioner}</td>
                    <td class="pa3">{scorePM.expert}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3">Customer & Stakeholder Management</td>
                    <td class="pa3">{scoreCSM.participant}</td>
                    <td class="pa3">{scoreCSM.practitioner}</td>
                    <td class="pa3">{scoreCSM.expert}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3">Product Delivery</td>
                    <td class="pa3">{scorePD.participant}</td>
                    <td class="pa3">{scorePD.practitioner}</td>
                    <td class="pa3">{scorePD.expert}</td>
                </tr>
                <tr class="stripe-dark">
                    <td class="pa3">Relationship with the team</td>
                    <td class="pa3">{scoreRT.participant}</td>
                    <td class="pa3">{scoreRT.practitioner}</td>
                    <td class="pa3">{scoreRT.expert}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
