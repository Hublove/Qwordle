import { error, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			let authData = await locals.pb.collection('users').authWithPassword(body.email, body.password);
			// if (!locals.pb?.authStore?.model?.verified) {
			// 	locals.pb.authStore.clear();
			// 	return {
			// 		notVerified: true
			// 	};
			// }
            // throw redirect(303, '/');

            
		} catch (err) {
            console.log(err);

            if (err?.data?.code == 400) {
                console.log("POGGERS");
                return {
					notVerified: true
				};

            } else {
                console.log('Error: ', err);
                throw error(500, 'Something went wrong logging in');
            }
		}

		throw redirect(303, '/');
	}
};