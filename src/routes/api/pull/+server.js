import { error, json } from '@sveltejs/kit';
import clientPromise from '../../../lib/db.js';
/** @type {import('./$types.js').RequestHandler} */

import { lastOfArray } from 'rxdb/plugins/core';

export async function GET({ params, url, headers, request, locals }) {
	/* check creds*/
	const session = await locals.auth();
	if (!session) {
		return error(401, 'Unauthorized');
	}

	const query = url.searchParams;
	const client = await clientPromise;
	const database = client.db('scout');
	const mongoCollection = database.collection('teams');
	const id = query.get('id');
	let updatedAt = parseInt(query.get('updatedAt'), 10);
	const documents = await mongoCollection
		.find({
			$or: [
				/**
				 * Notice that we have to compare the updatedAt AND the id field
				 * because the updatedAt field is not unique and when two documents have
				 * the same updatedAt, we can still "sort" them by their id.
				 */
				{
					updatedAt: { $gt: updatedAt }
				},
				{
					updatedAt: { $eq: updatedAt },
					id: { $gt: id }
				}
			]
		})
		.limit(parseInt(query.get('batchSize'), 10))
		.toArray();
	console.log('pull', documents);
	const newCheckpoint =
		documents.length === 0
			? { id, updatedAt }
			: {
					id: lastOfArray(documents).id,
					updatedAt: lastOfArray(documents).updatedAt
				};
	return json({ documents, checkpoint: newCheckpoint });
}
