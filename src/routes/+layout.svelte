<script>
	import '../app.postcss';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import Header from '$lib/Components/Header.svelte';
	import Footer from "$lib/Components/Footer.svelte";
</script>

<svelte:head><title>Six Degrees</title></svelte:head>

<main class="bg-surface-50-900-token w-full h-screen font-mono flex flex-col" lang="en">
	<Header />
	<slot />
	<Footer/>
</main>
