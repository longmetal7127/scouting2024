import { pullStream$ } from '../../../lib/pullstream';
export async function GET({ url, locals }) {
    // Check if the request is authenticated
    const session = await locals.auth();
    if (!session) {
        return error(401, 'Unauthorized');
    }
	let subscription;
	const stream = new ReadableStream({
		start(controller) {
			subscription = pullStream$.subscribe((event) =>
				controller.enqueue('data: ' + JSON.stringify(event) + '\n\n')
			);
		},
		cancel() {
			subscription.unsubscribe();
		}
	});

	return new Response(stream, {
		headers: {
			// Denotes the response as SSE
			'Content-Type': 'text/event-stream',
			// Optional. Request the GET request not to be cached.
			'Cache-Control': 'no-cache'
		}
	});
}
