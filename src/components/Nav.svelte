<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<div class="navbar bg-base-100 drop-shadow-md rounded-box">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">MetalScout</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a class="" href="/protected/scout">Scout</a></li>
			{#if $page.data.session}
				<li>
					<span class="signedInText">
						{$page.data.session.user?.email ?? $page.data.session.user?.name}
					</span>
				</li>
				<li>
					<SignOut class="hover:bg-primary-dark rounded-md bg-primary text-primary-content">
						<div slot="submitButton">Sign out</div>
					</SignOut>
				</li>
			{:else}
				<li><span class="notSignedInText">You are not signed in</span></li>
				<li>
					<SignIn class="hover:bg-primary-dark rounded-md bg-primary text-primary-content">
						<div slot="submitButton" class="">Sign in</div>
					</SignIn>
				</li>
			{/if}
		</ul>
	</div>
</div>
