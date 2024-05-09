<script>
	import { page } from '$app/stores';
	const links = [
		'https://media1.tenor.com/m/CqnGzF4lvGMAAAAC/frc-3636-frc.gif',
		'/cry.gif',
		'https://media1.tenor.com/m/d2wJENl3CrYAAAAC/cry-about-it-frc-8764.gif',
		'https://media1.tenor.com/m/o9lVIL3yRKkAAAAC/cry-about-it-frc-pnw.gif'
	];
	let link = links[Math.floor(Math.random() * links.length)];
</script>

{#if $page.data.session}
	<slot />
{:else}
	<div class="flex flex-1 flex-col items-center justify-center">
		<h1 class="flex-1 p-4 text-2xl font-extrabold text-red-600">Access Denied</h1>
		<p>
			<img src={link} />
		</p>
	</div>
{/if}
