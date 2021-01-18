<script>
	export let dojoData = [];
	export let index = 0;
	import Button from "./../atoms/Button.svelte";
	import Toast from "./../atoms/Toast.svelte";

	function CopyToClipboard(id) {
		var r = document.createRange();
		r.selectNode(document.getElementById(id));
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(r);
		document.execCommand("copy");
		window.getSelection().removeAllRanges();

		changeToast();
	}

	const changeToast = () => {
		showToast = !showToast;
		setTimeout(() => (showToast = !showToast), 1800);
	};

	let showToast = false;
</script>

<Toast {showToast} />
<div class="bg-white ma2 shadow-5  br3 tl ">
	{#if dojoData.length > 0}
		<div class="tr pt2 pr2">
			<Button onClick={() => CopyToClipboard(`tableID-${index}`)}>
				<img src="icons/copy.svg" alt="copiar" />
			</Button>
		</div>
		<div>
			<h3 class=" tc">CURSOS RECOMENDADOS</h3>
		</div>
		<div id={`tableID-${index}`}>
			<table class="w-100">
				<thead>
					<tr>
						<th class="tc fl w-40 pa2">
							<p>PREGUNTA</p>
						</th>
						<th class="tc fl w-40 pa2 ">
							<p>CURSO</p>
						</th>
						<th class="tc fl w-20 pa2">
							<p>ENLACE</p>
						</th>
					</tr>
				</thead>

				<tbody>
					{#each dojoData as { pregunta, curso, enlace }, index}
						<tr class="cf {index % 2 == 0 ? 'bg-light-gray' : 'bg-white'}">
							<td class="fl tl w-40 pa2 f6">{pregunta}</td>
							<td class="fl tc w-40 pa2">{curso}</td>
							<td class="fl tc w-20 pa2 grow">
								<a target="_blank" href={enlace}> 🔗 </a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="ma2 pa2 f6">
				<h3 class="tc">Leyenda</h3>
				<p>
					<b>E-Learning: </b>
					Si tienes acceso a Dojo ya puedes acceder a esta formación.
				</p>
				<p>
					<b>Synchronous: </b>
					Tiene que ser gestionado a través del área de formación.
				</p>
				<p>
					<b>Guided Learning: </b>
					Tiene que ser gestionado a través del área de formación.
				</p>
				<p>
					<b>Standard: </b>
					Tiene que ser gestionado a través del área de formación.
				</p>
			</div>
		</div>
	{:else}
		<h3 class="pa4 tc ">Actualmente no tiene cursos recomendados</h3>
	{/if}
</div>
