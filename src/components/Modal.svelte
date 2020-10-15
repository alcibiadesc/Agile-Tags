<script>
    import Button from "./UI/Button.svelte";

    $: showModal = false;
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
        console.log(showModal);
    }}>
    Plantilla Correctora
</button>

<dialog class:hide={showModal == false} class:show={showModal == true}>
    <div class="drop-area">
        ¡Añade tu plantilla correctora aquí!
        <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
    </div>

    <div class=" mt3">
        <button
            class="aceptar"
            on:click={() => {
                showModal = !showModal;
                console.log(showModal);
            }}>
            Aceptar
        </button>

        <button
            class="cancel"
            on:click={() => {
                showModal = !showModal;
                console.log(showModal);
            }}>
            Cancelar
        </button>
    </div>
</dialog>
