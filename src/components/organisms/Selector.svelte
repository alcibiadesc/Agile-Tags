<script>
	export let selectors = [
		{
			id: "",
			title: "",
			onClick: () => {},
		},
	];
</script>

<article class="cf f7 ma4 noselect">
	{#each selectors as { id, title, onClick }}
		<div
			on:click={onClick(id)}
			class=" grow link fl w-50 bg-near-white tc">
			<h1>{title}</h1>
		</div>
	{/each}
</article>
