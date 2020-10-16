<script>
  import { resetMaster } from "./../stores/masterStore.js";
  import Modal from "./Modal.svelte";
  import { items, reset } from "./../stores/answerStore.js";

  import xlsx from "xlsx";

  import { Button } from "./UI";

  let logo = "./Logo Agile Flag.svg";

  function exportFile() {
    const ws = xlsx.utils.json_to_sheet($items);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Spreadsheet Viewer");
    xlsx.writeFile(wb, "svelte-spreadsheet.xlsx");
  }
</script>

<style>
  header {
    padding: 5px 0;
  }

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
  <img class="w-50" src={logo} alt="site logo" />

  <div class="menu">
    <Button onClick={reset}>Resetear</Button>
    <Button type="secondary" onClick={exportFile}>Exportar</Button>

    <Modal />
  </div>
</header>
