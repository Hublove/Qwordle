import { error, redirect } from '@sveltejs/kit';
import { generateUsername } from '../../lib/utils';

export const actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		

		try {
            // console.log(locals);
            console.log(body);
            
			await locals.pb.collection('users').create(body);
			// await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};