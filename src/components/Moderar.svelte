<script>
	import {moderateStore} from "../stores/moderateStore.js";	
	export let key;
	export let item;
	export let i;


	const  isPair = () => {
		let result = Number(key.substring(4,5)) % 2 == 0 ? true : false;
		console.log(result);
		return result;
	}

</script>



<style>
    .pair {
        background-color: #ffbdbd;
    }
</style>
                <div class="mt3 ph3 pt2 pb2 shadow-5 bg-white"
                    class:pair={isPair()}>
                    <p class="b">{key}</p>
                    <p>{item[key]}</p>

                    <div class="cf">
                        <p class="f6 green fl w-50">
                            Puntuación:
                            {$moderateStore[i][key] ? $moderateStore[i][key] : 0}
                        </p>

                        <p class=" f6 tr mb1 fl w-50">
                            <input
                                bind:value={$moderateStore[i][key]}
                                type="number"
                                placeholder="Moderar" />
                        </p>
                        <p />
                    </div>
                </div>
