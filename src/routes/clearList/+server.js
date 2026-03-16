import { json } from '@sveltejs/kit';

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, arrayRemove, updateDoc } from 'firebase/firestore';

import {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId
} from '$env/static/private';

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// @ts-ignore
export async function POST({ request }) {
	const { key } = await request.json();

	// @ts-ignore

	const groupRef = doc(db, 'groups', key);

	await updateDoc(groupRef, {
		items: []
	});

	return json({}, { status: 201 });
}
