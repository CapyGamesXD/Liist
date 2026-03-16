<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let key = $state('');
	onMount(async () => {
		const response = await fetch('/create', {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		key = data.id;
		localStorage.setItem('key', key);
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(key);
		} catch (e) {
			console.warn('Clipboard failed:', e);
		}
		goto('/username');
	}
</script>

<div class="centerdiv">
	<h1 class="title">Key:</h1>

	<p class="key">
		{key}
	</p>

	<button class="bigbutton" onclick={copy}> Done </button>
</div>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>
