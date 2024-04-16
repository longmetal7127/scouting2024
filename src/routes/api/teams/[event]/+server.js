import { error, json } from "@sveltejs/kit";
import clientPromise from "../../../../lib/db";
import { getEventData } from "../../../../lib/tba";
export const GET = async ({params, locals}) => {
	// check if the request is authenticated
	const session = await locals.auth();
	if (!session) {
		return error(401, 'Unauthorized');
	}
    const { event } = params;
    const validEvents = (await getEventData()).filter((e)=> e.year == 2024).map((e)=> e.event_code);
    if (!validEvents.includes(event)) {
        return error(400,  'Invalid event' );
    }
    // get the teams for the event
    const client = await clientPromise;
    const database = client.db('scout');
    const collection = database.collection('teams');
    const teams = await collection.find({ event }).toArray();

    return json({ teams });

};
