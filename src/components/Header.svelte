<script>
  import { resetMaster } from "./../stores/masterStore.js";
  import Button from "./UI/Button.svelte";
  import { moderateStore, resetModerator } from "./../stores/moderateStore.js";
  import Modal from "./Modal.svelte";
  import { items, reset } from "./../stores/answerStore.js";

  import xlsx from "xlsx";

  let logo = "./Logo Agile Flag.svg";

  function exportFile() {
    const ws = xlsx.utils.json_to_sheet($items);
    const wb = xlsx.utils.book_new();
    const moderator = xlsx.utils.json_to_sheet($moderateStore);

    xlsx.utils.book_append_sheet(wb, ws, "Answer");
    xlsx.utils.book_append_sheet(wb, moderator, "Moderator");

    xlsx.writeFile(wb, "Moderated-Agile-Flags.xlsx");
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
    <Button
      onClick={() => {
        reset();
        resetMaster();
        resetModerator();
      }}>
      Resetear
    </Button>
    <Button type="secondary" onClick={exportFile}>Exportar</Button>

    <Modal />
  </div>
</header>
