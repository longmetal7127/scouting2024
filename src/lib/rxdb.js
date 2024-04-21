import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';
import { replicateRxCollection } from 'rxdb/plugins/replication';
import { Subject } from 'rxjs';
import { deepEqual } from 'rxdb';

import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration-schema';
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationPlugin);
if (import.meta.env.DEV) {
	addRxPlugin(RxDBDevModePlugin);
}

const myDatabase = await createRxDatabase({
	name: 'mydatabase',
	storage: getRxStorageDexie()
});
const myPullStream$ = new Subject();
const eventSource = new EventSource('/api/pullStream', { withCredentials: true });
eventSource.onmessage = (event) => {
	const eventData = JSON.parse(event.data);
	myPullStream$.next({
		documents: eventData.documents,
		checkpoint: eventData.checkpoint
	});
};
eventSource.onerror = () => myPullStream$.next('RESYNC');

const teamSchema = {
	version: 1,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 100 // <- the primary key must have set maxLength
		},
		number: {
			type: 'integer'
		},
		comment: {
			type: 'string'
		},
		event: {
			type: 'string'
		},
		nickname: {
			type: 'string'
		},
		autonomousDescription: {
			type: 'string'
		},
		startPositions: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					x: { type: 'number' },
					y: { type: 'number' }
				}
			}
		},
		autoCapabilities: {
			type: 'array',
			items: {
				type: 'string'
			}
		},
		capabilities: {
			type: 'array',
			items: {
				type: 'string'
			}
		},
		updatedAt: {
			type: 'number'
		}
	},
	required: ['id', 'number']
};

const conflictHandler = function (
	/**
	 * The conflict handler gets 3 input properties:
	 * - assumedMasterState: The state of the document that is assumed to be on the master branch
	 * - newDocumentState: The new document state of the fork branch (=client) that RxDB want to write to the master
	 * - realMasterState: The real master state of the document
	 */
	i
) {
	/**
	 * Here we detect if a conflict exists in the first place.
	 * If there is no conflict, we return isEqual=true.
	 * If there is a conflict, return isEqual=false.
	 * In the default handler we do a deepEqual check,
	 * but in your custom conflict handler you probably want
	 * to compare specific properties of the document, like the updatedAt time,
	 * for better performance because deepEqual() is expensive.
	 */

	if (deepEqual(i.newDocumentState, i.realMasterState)) {
		return Promise.resolve({
			isEqual: true
		});
	}
	/**
	 * If a conflict exists, we have to resolve it.
	 * The default conflict handler will always
	 * drop the fork state and use the master state instead.
	 *
	 * In your custom conflict handler you likely want to merge properties
	 * of the realMasterState and the newDocumentState instead.
	 */
	if (i.newDocumentState.updatedAt > i.realMasterState.updatedAt) {
		return Promise.resolve({
			isEqual: false,
			documentData: i.newDocumentState
		});
	}
	return Promise.resolve({
		isEqual: false,
		documentData: i.realMasterState
	});
};
await myDatabase.addCollections({
	teams: {
		schema: teamSchema,
		conflictHandler,
		migrationStrategies: {
			// 1 means, this transforms data from version 0 to version 1
			1: function (oldDoc) {
				oldDoc.startPositions = oldDoc.startPositions || [];
				return oldDoc;
			}
		}
	}
});

export const myRxCollection = myDatabase.teams;
const replicationState = replicateRxCollection({
	collection: myRxCollection,
	replicationIdentifier: 'my-http-replication',

	pull: {
		stream$: myPullStream$.asObservable(),

		async handler(checkpointOrNull, batchSize) {
			console.log('pull', checkpointOrNull, batchSize);
			const updatedAt = checkpointOrNull ? checkpointOrNull.updatedAt : 0;
			const id = checkpointOrNull ? checkpointOrNull.id : '';
			const response = await fetch(`/api/pull?updatedAt=${updatedAt}&id=${id}&limit=${batchSize}`);
			const data = await response.json();
			return {
				documents: data.documents,
				checkpoint: data.checkpoint
			};
		}
	},
	push: {
		async handler(changeRows) {
			const rawResponse = await fetch('/api/push', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(changeRows)
			});
			const conflictsArray = await rawResponse.json();
			return conflictsArray;
		}
	}
});
replicationState.error$.subscribe((error) => {
	console.log(error);
	if (
		error.parameters.errors &&
		error.parameters.errors[0] &&
		error.parameters.errors[0].code === 426
	) {
		// client is outdated -> enforce a page reload
		location.reload();
	}
});
