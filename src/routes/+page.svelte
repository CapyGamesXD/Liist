<script>
	import { goto } from '$app/navigation';

	// @ts-ignore
	let items = $state([]);
	let item = $state('');

	async function sendItem() {
		const response = await fetch('/addItem', {
			method: 'POST',
			body: JSON.stringify({ item }),
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
	<div class="topGlass">
		<h1>My Group:</h1>
	</div>
	<div class="list">
		{#each items as item}
			<p class="listStuff">{item}</p>
		{/each}
	</div>
	<div class="bottomGlass">
		<input bind:value={item} />

		<button>
			<p class="smol">Add Item</p>
		</button>
	</div>
</div>
