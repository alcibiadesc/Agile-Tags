<script>
	import xlsx from "xlsx";
	import Button from "./../atoms/Button.svelte";
	import Modal from "./../molecules/Modal.svelte";
	import { resetMaster } from "./../../stores/masterStore.js";
	import { moderateStore, resetModerator } from "./../../stores/moderateStore.js";
	import {recomendatorStore, resetRecomendator} from "./../../stores/recomendator.js"; 
	import { items, reset } from "./../../stores/answerStore.js";

	function exportFile() {
		const ws = xlsx.utils.json_to_sheet($items);
		const wb = xlsx.utils.book_new();
		const moderator = xlsx.utils.json_to_sheet($moderateStore);
		const recomendator = xlsx.utils.json_to_sheet($recomendatorStore);
		
		xlsx.utils.book_append_sheet(wb, ws, "Answer");
		xlsx.utils.book_append_sheet(wb, moderator, "Moderator");
		xlsx.utils.book_append_sheet(wb, recomendator, "Dojo");

		xlsx.writeFile(wb, "Moderated-Agile-Flags.xlsx");
	}
	const resetStores = () => {
		reset();
		resetMaster();
		resetModerator();
		resetRecomendator(); 
	};
</script>

<style>

	.menu {
		display: none;
	}

	.with-menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.with-menu .menu {
		display: block;
	}

	.with-menu :global(.btn) {
		margin-bottom: 0;
	}
</style>

<header class={$items.length ? 'with-menu' : ''}>
	<img class="w-20" src={'banner.svg'} alt="site logo" />

	<div class="menu">
		<Button onClick={resetStores}>Resetear</Button>
		<Button type="secondary" onClick={exportFile}>Exportar</Button>
		<Modal />
	</div>
</header>
