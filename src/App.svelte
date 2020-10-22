<script>
	import xlsx from "xlsx";
	import { items } from "./stores/answerStore.js";
	import { moderateStore } from "./stores/moderateStore";
	import Faqs from "./components/Faqs.svelte";
	import Header from "./components/Header.svelte";
	import Selector from "./components/Selector.svelte";
	import Footer from "./components/Footer.svelte";

	export let files;
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

				if (sheetName == "Moderator") {
					moderateStore.set(rowObject);
				} else {
					items.set(rowObject);
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
	main {
		width: 100%;
		text-align: center;
		padding: 20px 40px;
		margin: 0 auto;
	}

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

<main>
	<Header />

	{#if !$items.length}
		<div class="drop-area bg-white">
			Añade tu archivo de excel

			<svg
				class="grow link black dim"
				on:click={toogleFaq}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="black"
				width="18px"
				height="18px"><path d="M0 0h24v24H0z" fill="none" />
				<path
					d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>

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
	{:else}
		<Selector />
	{/if}
	<Footer />
</main>
