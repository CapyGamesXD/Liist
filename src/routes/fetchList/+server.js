import { json } from '@sveltejs/kit';

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
	const groupRef = doc(db, 'groups', key);

	const itemSnap = await getDoc(groupRef);
	const itemList = itemSnap.data();

	return json({ itemList }, { status: 201 });
}
