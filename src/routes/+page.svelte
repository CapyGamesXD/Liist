<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// @ts-ignore
	let items = $state([]);
	let item = $state('');
	let key = '';

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
	}

	onMount(async () => {
		key = localStorage.getItem('key') || '';
		await fetchList();
	});

	async function sendItem() {
		const response = await fetch('/addItem', {
			method: 'POST',
			body: JSON.stringify({ item, key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		item = '';
		await fetchList();
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
		await fetchList();
	}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>

<div class="centerdiv">
	<div class="topGlass">
		<h1>My Group:</h1>
	</div>
	<div class="list">
		{#if items.length === 0}
			<p>Looks like there's nothing here yet!</p>
			<div class="divider"></div>
			<p>Type something and add it below!</p>
		{:else}
			{#each items as itempart}
				<button class="smallButton" onclick={() => removeItem(itempart)}>Remove Item</button>
				<p class="listStuff">{itempart}</p>

				<div class="divider"></div>
			{/each}
		{/if}
	</div>
	<div class="bottomGlass">
		<input bind:value={item} />

		<button onclick={sendItem}>
			<p class="smol">Add Item</p>
		</button>
	</div>
</div>
