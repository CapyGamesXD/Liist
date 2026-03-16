<script>
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { getAuth, signInAnonymously } from 'firebase/auth';
	import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
	import { initializeApp } from 'firebase/app';

	// @ts-ignore
	let items = $state([]);
	let item = $state('');
	let key = $state('');
	let username = $state('');
	let user = $state('');
	let firebaseConfig = {};
	// @ts-ignore

	async function getSecrets() {
		const response = await fetch('/sendSecrets', {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let secrets = await response.json();
		firebaseConfig = secrets.firebaseConfig;
	}

	onMount(async () => {
		key = localStorage.getItem('key') || '';
		username = localStorage.getItem('username') || '';

		if (key === '') {
			goto('/start');
		}

		await getSecrets();

		const app = initializeApp(firebaseConfig);
		const auth = getAuth();

		const db = getFirestore(app);

		signInAnonymously(auth).then(() => {
			console.log('SIGN IN WORKED! ');
		});

		const unsub = onSnapshot(doc(db, 'groups', key), (doc) => {
			console.log('CHANGES DETECTED!');
			// @ts-ignore
			items = doc.data().items || [];
		});

		onDestroy(() => {
			unsub();
		});
	});

	async function sendItem() {
		const response = await fetch('/addItem', {
			method: 'POST',
			body: JSON.stringify({ item, key, username }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		item = '';
	}

	// @ts-ignore
	async function removeItem(itempart) {
		const response = await fetch('/removeItem', {
			method: 'POST',
			body: JSON.stringify({ itempart, key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	async function clearList() {
		const response = await fetch('/clearList', {
			method: 'POST',
			body: JSON.stringify({ key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	// @ts-ignore
	async function doneFunc(itempart) {
		// @ts-ignore
		const response = await fetch('/sendDone', {
			method: 'POST',
			body: JSON.stringify({ key, itempart }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>

<div class="centerdiv">
	<a class="topGlass" href="/settings">
		<h1>My Group:</h1>
	</a>

	<div class="list">
		{#if items.length === 0}
			<p>Hey {username}!</p>
			<p>Looks like there's nothing here yet!</p>
			<div class="divider"></div>
			<p>Type something and add it below!</p>
		{:else}
			{#each items as itempart}
				<button class="smallButton" onclick={() => removeItem(itempart)}>Remove</button>
				<button onclick={() => doneFunc(itempart)} class="hidden">
					{#if itempart.complete == true}
						<p class="listStuffDone">{itempart.item}</p>
					{:else}
						<p class="listStuff">{itempart.item}</p>
					{/if}

					<p class="user">{itempart.user}</p>
				</button>

				<div class="divider"></div>
			{/each}
			<button class="smallButton" onclick={() => clearList()}>Clear</button>
		{/if}
	</div>
	<div class="bottomGlass">
		<input placeholder="Enter Item" bind:value={item} />

		<button onclick={sendItem}>
			<p class="buttonText">Add Item</p>
		</button>
	</div>
</div>
