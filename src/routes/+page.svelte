<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<div class="relative py-24 sm:py-32 md:py-40">
	<div class="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:gap-y-24 sm:px-6 lg:px-8">
		<div class="text-center">
			<div class="mb-10">
				<span
					class="dark:bg-primary-400 text-primary-500 dark:text-primary-400 ring-primary-500 dark:ring-primary-400 relative inline-flex items-center rounded-full bg-primary px-2.5 py-1.5 text-sm font-semibold ring-1 ring-inset ring-opacity-25 dark:bg-opacity-10 dark:ring-opacity-25"
					><span class="absolute inset-0" aria-hidden="true"></span>

					Longmetal Only
				</span>
			</div>
			<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
				Scout Competitions
			</h1>
			<p class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
				Scout your competitions with ease. MetalScout is the only scouting app you'll ever need.
			</p>
			<div class="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
				<a
					class="focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex flex-shrink-0 items-center gap-x-2.5 rounded-full bg-gray-900 px-3.5 py-2.5 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:bg-gray-900 disabled:opacity-75 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:disabled:bg-white"
					href="/protected/scout"
					><!----><span class=""
						>Scout <svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="inline-block h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
							/>
						</svg>
					</span></a
				>
			</div>
		</div>
		<div class="relative" data-v-fe2ce7dd="">
			<div class="bg-background border-gradient rounded-xl p-4" data-v-fe2ce7dd="">
				<div
					class="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg border border-dashed border-gray-950/10 dark:border-white/10"
					data-v-fe2ce7dd=""
				>
					<svg
						class="absolute inset-0 h-full w-full stroke-gray-950/10 dark:stroke-white/10"
						fill="none"
						data-v-fe2ce7dd=""
						><defs data-v-fe2ce7dd=""
							><pattern
								id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
								x="0"
								y="0"
								width="10"
								height="10"
								patternUnits="userSpaceOnUse"
								data-v-fe2ce7dd=""
								><path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" data-v-fe2ce7dd=""></path></pattern
							></defs
						><rect
							stroke="none"
							fill="u4rl(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
							width="100%"
							height="100%"
							data-v-fe2ce7dd=""
						></rect></svg
					>
				</div>
			</div>
		</div>
	</div>
</div>
