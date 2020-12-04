<script>
	import { tag } from "../../AxisBBDD.js";

	export let tableResultData = {};

	const {
		participantAll,
		practitionerAll,
		expertAll,
		axisA,
		axisB,
		axisC,
		axisD,
		allAxisA,
		allAxisB,
		allAxisC,
		allAxisD,
	} = tableResultData;
</script>

<div class="mb4 pb3 pt0 mt0 topindex">
	<div class="overflow-auto">
		<table class="f6 w-80 mw8 center bg-white ma2 shadow-5 br3" cellspacing="0">
			<thead class="">
				<tr class="stripe-dark ">
					<th class="fw6 tc pa3 bg-white">AXIS</th>
					<th class="fw6 tc pa3 bg-white"><strong>Participant</strong></th>
					<th class="fw6 tc pa3 bg-white"><strong>Practitioner</strong></th>
					<th class="fw6 tc pa3 bg-white"><strong>Expert</strong></th>
					<th class="fw6 tc pa3 bg-white">Resultado</th>
				</tr>
			</thead>
			<tbody class="lh-copy tc">
				{#if tag[0]}
					<tr class="stripe-dark">
						<td class="pa3">{tag[0]}</td>
						<td class="pa3">{Number(axisA.participant).toFixed(2)}</td>
						<td class="pa3">{Number(axisA.practitioner).toFixed(2)}</td>
						<td class="pa3">{Number(axisA.expert).toFixed(2)}</td>
						<td class="pa3">{allAxisA.toFixed(2)}</td>
					</tr>
				{/if}
				{#if tag[1]}
					<tr class="stripe-dark">
						<td class="pa3">{tag[1]}</td>
						<td class="pa3">{Number(axisB.participant).toFixed(2)}</td>
						<td class="pa3">{Number(axisB.practitioner).toFixed(2)}</td>
						<td class="pa3">{Number(axisB.expert).toFixed(2)}</td>
						<td class="pa3">{allAxisB.toFixed(2)}</td>
					</tr>
				{/if}
				{#if tag[2]}
					<tr class="stripe-dark">
						<td class="pa3">{tag[2]}</td>
						<td class="pa3">{Number(axisC.participant).toFixed(2)}</td>
						<td class="pa3">{Number(axisC.practitioner).toFixed(2)}</td>
						<td class="pa3">{Number(axisC.expert).toFixed(2)}</td>
						<td class="pa3">{allAxisC.toFixed(2)}</td>
					</tr>
				{/if}
				{#if tag[3]}
					<tr class="stripe-dark">
						<td class="pa3">{tag[3]}</td>
						<td class="pa3">{Number(axisD.participant).toFixed(2)}</td>
						<td class="pa3">{Number(axisD.practitioner).toFixed(2)}</td>
						<td class="pa3">{Number(axisD.expert).toFixed(2)}</td>
						<td class="pa3">{allAxisD.toFixed(2)}</td>
					</tr>
				{/if}

				<tr class="stripe-dark">
					<td class="pa3"><strong>Resultado</strong></td>
					<td class="pa3"><strong>{participantAll.toFixed(2)}</strong></td>
					<td class="pa3"><strong>{practitionerAll.toFixed(2)}</strong></td>
					<td class="pa3"><strong>{expertAll.toFixed(2)}</strong></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
