<script>
    import { resetModerator } from "./../stores/moderateStore.js";
    import { axisStore } from "../stores/axisStore.js";
    import { columnsMaster, itemsMaster } from "../stores/masterStore.js";

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
                const keys = Object.keys(rowObject[0]).map((col) => {
                    return {
                        id: col,
                        isVisible: true,
                        isEditable: false,
                        isImage: false,
                    };
                });
                columnsMaster.set(keys);
                itemsMaster.set(rowObject);
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
        console.log(showModal);
    }}>
    Plantilla Correctora
</button>

<dialog class:hide={showModal == false} class:show={showModal == true}>
    <div class="drop-area ">
        ¡Añade tu plantilla correctora aquí!
        <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            bind:files />
        <p>
            <span class="red mt3"> Ojo!</span>
            Cargar la plantilla eliminará la moderación que haya sido realizada
            hasta el momento.
        </p>
    </div>
    <div>
        <p>¿A qué rol le pertence?</p>
        <select bind:value={$axisStore} name="roles" id="roles">
            <option value="productOwner">Product Owner</option>
            <option value="scrumMaster">Scrum Master</option>
        </select>
    </div>
    <div class=" mt3">
        <button
            class="aceptar"
            on:click={() => {
                resetModerator();
                window.location.reload();
                showModal = !showModal;
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
