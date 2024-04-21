<script>
	import '../app.pcss';
	import Nav from '../components/Nav.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="min-h-screen bg-gray-50 p-2">
	<Nav />
	<slot />
</div>
