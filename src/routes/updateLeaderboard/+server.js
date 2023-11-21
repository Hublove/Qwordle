import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
	const { longestWord, length } = await request.json();
    try {
        const record = await locals.pb.collection('solutions').getOne(locals.user.id, {
        
        });
    } catch (err) {
        console.log(err);

        if (err?.data?.code == 404) {
            const data = {
                "id": locals.user.id,
                "username": locals.user.username,
                "longestWord": longestWord,
                "length": length
            };
            const record = await locals.pb.collection('solutions').create(data);


        } else {
            console.log('Error: ', err);
            throw error(500, 'Something went wrong adding to the leaderboard');
        }
    }
    
    
	return json(longestWord);
}
