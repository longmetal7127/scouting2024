<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{JSON.stringify($page.data)}
{#if $page.data.session}
	<span class="signedInText">
		{$page.data.session.user?.email ?? $page.data.session.user?.name}
	</span>
	<SignOut>
		<div slot="submitButton" class="buttonPrimary">Sign out</div>
	</SignOut>
{:else}
	<span class="notSignedInText">You are not signed in</span>
	<SignIn>
		<div slot="submitButton" class="buttonPrimary">Sign in</div>
	</SignIn>
{/if}
