<script>
	import { items } from "./stores/answerStore.js";
	import Header from "./components/organisms/Header.svelte";
	import View from "./components/pages/View.svelte";
	import Footer from "./components/atoms/Footer.svelte";
	import Home from "./components/pages/Home.svelte";
</script>

<style>
	main {
		width: 100%;
		text-align: center;
		padding: 20px 40px;
		margin: 0 auto;
	}
</style>

<main>
	<Header />

	{#if !$items.length}
		<Home />
	{:else}
		<View />
	{/if}
	<Footer />
</main>
