import { json } from '@sveltejs/kit';

import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

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
	const {} = await request.json();

	const groupRef = await addDoc(collection(db, 'groups'), {});

	console.log('It worked! :D The ID is:', groupRef.id);
	return json({ id: groupRef.id }, { status: 201 });
}
