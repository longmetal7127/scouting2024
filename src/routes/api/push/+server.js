import { lastOfArray } from 'rxdb';
import clientPromise from '../../../lib/db.js';
import { json } from '@sveltejs/kit';
let lastEventId = 0;
import { pullStream$ } from '../../../lib/pullstream.js';
import { update } from 'rxdb/plugins/update';

export async function POST({ params, url, headers, request, locals }) {
    const session = await locals.auth();
    if (!session) {
        return error(401, 'Unauthorized');
    }
	const client = await clientPromise;
	const database = client.db('scout');
	const mongoCollection = database.collection('teams');

	const changeRows = await request.json();
	console.log(changeRows);
	const conflicts = [];
	const event = {
		id: lastEventId++,
		documents: [],
		checkpoint: null
	};
	for (const changeRow of changeRows) {
		const realMasterState = await mongoCollection.findOne({ id: changeRow.newDocumentState.id });
		if (
			(realMasterState && !changeRow.assumedMasterState) ||
			(realMasterState &&
				changeRow.assumedMasterState &&
				/*
				 * For simplicity we detect conflicts on the server by only compare the updatedAt value.
				 * In reality you might want to do a more complex check or do a deep-equal comparison.
				 */
				realMasterState.updatedAt < changeRow.assumedMasterState.updatedAt)
		) {
			// we have a conflict
			conflicts.push(realMasterState);
            console.log('conflict!!')
		} else {
			console.log('updating');
			// no conflict -> write the document
			mongoCollection.updateOne(
				{ id: changeRow.newDocumentState.id },
				{
					$set: {
						number: changeRow.newDocumentState.number,
						comment: changeRow.newDocumentState.comment,
                        capabilities: changeRow.newDocumentState.capabilities,
                        updatedAt: changeRow.newDocumentState.updatedAt,
                        nickname: changeRow.newDocumentState.nickname,
                        autonomousDescription: changeRow.newDocumentState.autonomousDescription,
					}
				},
				{ upsert: true }
			);
			event.documents.push(changeRow.newDocumentState);
			event.checkpoint = {
				id: changeRow.newDocumentState.id,
				updatedAt: changeRow.newDocumentState.updatedAt
			};
		}
	}
	if (event.documents.length > 0) {
		pullStream$.next(event);
	}
	return json(conflicts);
}
