<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// @ts-ignore
	let items = $state([]);
	let item = $state('');
	let key = $state('');
	let username = $state('');
	let user = $state('');
	// @ts-ignore
	let done = $state([{}]);

	async function fetchList() {
		const response = await fetch('/fetchList', {
			method: 'POST',
			body: JSON.stringify({ key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let stuff = await response.json();
		items = stuff.itemList.items;
		user = stuff.itemList.user;
		console.log(item, '-', user);
	}

	onMount(async () => {
		key = localStorage.getItem('key') || '';

		username = localStorage.getItem('username') || '';
		if (key === '') {
			goto('/start');
		}
		await fetchList();
		setInterval(async () => {
			await fetchList();
		}, 2000);
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
		await fetchList();
	}

	// @ts-ignore
	async function removeItem(itempart) {
		delete done[itempart];
		const response = await fetch('/removeItem', {
			method: 'POST',
			body: JSON.stringify({ itempart, key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		await fetchList();
	}

	async function clearList() {
		// @ts-ignore
		done = {};
		done[items.length] = true;
		const response = await fetch('/clearList', {
			method: 'POST',
			body: JSON.stringify({ key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	// @ts-ignore
	function doneFunc(itempart) {
		// @ts-ignore

		done[itempart] = done[itempart] == undefined ? false : !done[itempart];
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
					{#if done[itempart] == false}
						<p class="listStuffDone">{itempart}</p>
					{:else}
						<p class="listStuff">{itempart}</p>
					{/if}

					<p class="user">{user}</p>
				</button>

				<div class="divider"></div>
			{/each}
			<button class="smallButton" onclick={() => clearList()}>Clear</button>
		{/if}
	</div>
	<div class="bottomGlass">
		<input placeholder="Enter Item" bind:value={item} />

		<button onclick={sendItem}>
			<p class="smol">Add Item</p>
		</button>
	</div>
</div>
