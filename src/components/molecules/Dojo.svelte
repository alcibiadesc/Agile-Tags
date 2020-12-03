<script>
	let recomendator = [

		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
		{pregunta: "a", curso: "b", enlace: "c"},
	]
</script>



<div class="bg-white ma2 shadow-5  br3 tl ">
	<h3 class="pt4 tc">CURSOS RECOMENDADOS</h3>
		<div>
		<table class="w-100">

			<thead>

			<tr>
				<th class="tc fl w-third pa2"><p>PREGUNTA</p></th>
				<th class="tc fl w-third pa2 "> <p>CURSO</p></th>
				<th class="tc fl w-third pa2"><p>ENLACE</p>
				</th>
			</tr>

			</thead>	

			<tbody>
	{#each recomendator as row, index}
			<tr class="cf {index%2 == 0 ? "bg-light-gray" : "bg-white"}">
				<td class="fl tc w-third pa2">{row.pregunta}</td>
				<td class="fl tc w-third pa2">{row.curso}</td>
				<td class="fl tc w-third pa2 grow"> <a target="_blank" href="{row.enlace}">
					<img src="icons/link.svg" alt="click">
				</a></td>
			</tr>

	{/each}
			</tbody>
		</table>
		</div>
	</div>


