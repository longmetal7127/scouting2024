<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<div class="navbar bg-base-100 drop-shadow-md rounded-box">
	<div class="flex-1">
        <img src="/longmetal.svg" class="h-8 w-8" />
		<a class="btn btn-ghost text-xl font-display" href="/">MetalScout</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if $page.data.session}
            			<li><a class="btn-secondary	" href="/protected/scout" >Scout</a></li>

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
