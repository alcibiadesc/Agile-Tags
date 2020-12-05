<script>
	import { axisStore } from "../../stores/axisStore.js";
	import {itemsMaster } from "../../stores/masterStore.js";
	import { selectOptions } from "../../AxisBBDD.js";
	import { recomendatorStore } from "../../stores/recomendator.js";
	import { moderateStore, resetModerator } from "./../../stores/moderateStore.js";
	import xlsx from "xlsx";
	$: showModal = false;

	export let files = { a: 1 };

	$: if (files.length) {
		parseExcel(files[0]);
	}

	function parseExcel(file) {
		const reader = new FileReader();

		reader.onload = function (e) {
			const result = e.target.result;
			const workbook = xlsx.read(result, {
				type: "binary",
			});

			workbook.SheetNames.forEach((sheetName) => {
				const rowObject = xlsx.utils.sheet_to_row_object_array(
					workbook.Sheets[sheetName]
				);
				
				if (sheetName == "Dojo") {
					recomendatorStore.set(rowObject);
				} else if (sheetName == "Moderator") {
					moderateStore.set(rowObject);
				} else {
					itemsMaster.set(rowObject);
				}
			});
		};

		reader.onerror = function (e) {
			console.error(e);
		};

		reader.readAsBinaryString(file);
	}
</script>

<style>
	.drop-area {
		border: 2px dashed var(--color-text-light);
		display: inline-block;
		padding: 50px;
	}

	.drop-area input {
		display: block;
		margin-top: 20px;
	}

	button {
		background: var(--color-text);
		border: none;
		border-radius: 4px;
		color: var(--color-white);
		cursor: pointer;
		padding: 10px 20px;
	}

	button:hover {
		opacity: 0.8;
	}

	.cancel {
		background: var(--color-primary);
	}

	.aceptar {
		background: var(--color-secondary);
	}

	.hide {
		visibility: hidden;
		opacity: 0;
		position: relative;
		z-index: -1;
	}

	.show {
		display: block;
		z-index: 3;
	}

	@-webkit-keyframes appear {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-10px);
			transform: translateY(-10px);
		}
	}

	@keyframes appear {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-10px);
			transform: translateY(-10px);
		}
	}
	dialog {
		-webkit-animation: appear 350ms ease-in 1;
		animation: appear 350ms ease-in 1;
		max-width: 600px;
	}
</style>

<button
	type="plain"
	on:click={() => {
		showModal = !showModal;
	}}>
	Plantilla Correctora
</button>

<dialog class:hide={showModal == false} class:show={showModal == true}>
	<div class="drop-area ">
		<p>¡Añade tu plantilla correctora aquí!</p>
		<a
			target="_blank"
			href="https://teams.microsoft.com/_#/files/General?threadId=19%3A96955f08827f4d52a19e5ae5e410f968%40thread.skype&ctx=channel&context=VALIDADORES%2520-%2520Plantillas%2520Maestra&rootfolder=%252Fsites%252FCTO-TransformacinAGILEyDevops%252FShared%2520Documents%252FGeneral%252FAgile%2526EE%2520Academy%25202020%252FEtiquetado%2520Roles%252FValidador%2520Web%252FVALIDADORES%2520-%2520Plantillas%2520Maestra">Carpeta
			de Teams con los validadores</a>
		<input
			type="file"
			accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			bind:files />
	</div>
	<div>
		<p>¿A qué rol le pertenece?</p>
		<select bind:value={$axisStore} name="roles" id="roles">
			{#each selectOptions as option}
				<option value={option.value}>{option.description}</option>
			{/each}
		</select>
	</div>
	<div class=" mt3">
		<button
			class="aceptar"
			on:click={() => {
				window.location.reload();
				showModal = !showModal;
				resetModerator();
			}}>
			Aceptar
		</button>

		<button
			class="cancel"
			on:click={() => {
				showModal = !showModal;
			}}>
			Cancelar
		</button>
	</div>
</dialog>
