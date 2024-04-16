import { SvelteKitAuth } from '@auth/sveltekit';
import Auth0 from '@auth/sveltekit/providers/auth0';
import {
	AUTH_SECRET,
	AUTH_AUTH0_SECRET,
	AUTH_AUTH0_ISSUER,
	AUTH_AUTH0_ID
} from '$env/static/private';
export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Auth0({
			client_id: AUTH_AUTH0_ID,
			client_secret: AUTH_AUTH0_SECRET,
			issuer: AUTH_AUTH0_ISSUER
		})
	],
	secret: AUTH_SECRET
});
