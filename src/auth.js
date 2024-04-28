import { SvelteKitAuth } from '@auth/sveltekit';
import Authentik from '@auth/sveltekit/providers/authentik';
import {
	AUTH_SECRET,
	AUTH_AUTHENTIK_ISSUER,
	AUTH_AUTHENTIK_SECRET,
	AUTH_AUTHENTIK_ID
} from '$env/static/private';
export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Authentik({
			clientId: AUTH_AUTHENTIK_ID,
			clientSecret: AUTH_AUTHENTIK_SECRET,
			issuer: 'https://auth.frc.autos/application/o/scouting/',
		})
	],
	secret: AUTH_SECRET
});
