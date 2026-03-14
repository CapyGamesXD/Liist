<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let key = $state('');
	onMount(() => {
		key = localStorage.getItem('key') || '';
	});
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(key);
		} catch (e) {
			console.warn('Clipboard failed:', e);
		}
		copied = true;
		console.log(copied);
	}
</script>

<div class="centerdiv">
	<a href="/" class="back">Back</a>
	<h1 class="title">Settings:</h1>
	<div class="divider"></div>

	{#if copied == false}
		<div class="glass">
			<button class="hidden" onclick={copy}>Copy Key</button>
		</div>
	{:else}
		<div class="glass">
			<button class="hidden" onclick={copy}>Copied!</button>
		</div>
	{/if}

	<div class="divider"></div>

	<a class="glass" href="/start">
		<p>Restart</p>
	</a>
</div>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>
