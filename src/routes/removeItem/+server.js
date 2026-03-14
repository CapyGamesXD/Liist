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
import { onMount } from 'svelte';

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
	const { itempart, key } = await request.json();

	const groupRef = doc(db, 'groups', key);

	await updateDoc(groupRef, {
		items: arrayRemove(itempart)
	});

	return json({}, { status: 201 });
}
