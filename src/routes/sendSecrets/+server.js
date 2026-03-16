import {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId
} from '$env/static/private';
import { json } from '@sveltejs/kit';

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId
};

export async function POST({ request }) {
	const {} = await request.json();

	return json({ firebaseConfig }, { status: 201 });
}
