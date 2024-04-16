<script>
	import { page } from '$app/stores';
	const links = [
		'https://media1.tenor.com/m/CqnGzF4lvGMAAAAC/frc-3636-frc.gif',
		'https://media.discordapp.net/attachments/369006332390408193/1214201553758453820/8hr94m.gif?ex=662f9f51&is=661d2a51&hm=435b3040bd8f66a6dbcdbfa2d8f4bf1f92ea7802bd59c40d52d1bb9dac3d8b26&=&width=520&height=212',
    "https://media1.tenor.com/m/d2wJENl3CrYAAAAC/cry-about-it-frc-8764.gif",
    "https://media1.tenor.com/m/o9lVIL3yRKkAAAAC/cry-about-it-frc-pnw.gif"
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
