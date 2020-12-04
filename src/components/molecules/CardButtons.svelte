<script>
	export let buttons = [];
</script>

<div>
	{#each buttons as { id, title, onClick, icon }}
		<button
			class="grow mt4 mh2 br3 "
			{title}
			on:click|stopPropagation={onClick(id)}>
			<img src="icons/{icon}.svg" alt={title} />
		</button>
	{/each}
</div>
