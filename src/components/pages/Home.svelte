<script>
	import { recomendatorStore } from "../../stores/recomendator.js";
	import { items } from "./../../stores/answerStore.js";
	import {itemsMaster} from "./../../stores/masterStore.js"; 
	import xlsx from "xlsx";
	import { moderateStore } from "./../../stores/moderateStore.js";
	import Faqs from "./../atoms/Faqs.svelte";

	export let files = "";
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
					items.set(rowObject);
					itemsMaster.set(rowObject); 
				}
			});
		};

		reader.onerror = function (e) {
			console.error(e);
		};

		reader.readAsBinaryString(file);
	}

	let showFaq = false;
	const toogleFaq = () => (showFaq = !showFaq);
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
</style>

<div class="drop-area bg-white mt4">
	Añade tu archivo de excel
	<img
		class="grow link black dim"
		on:click={toogleFaq}
		src="icons/faqs.svg"
		alt="faqs" />
	<input
		type="file"
		accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		bind:files />
</div>
{#if showFaq}
	<div class="tc center">
		<Faqs />
	</div>
{/if}
