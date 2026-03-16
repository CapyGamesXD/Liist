<script>
	import { goto } from '$app/navigation';

	let inputKey = $state('');
	function join() {
		if (inputKey != '') {
			localStorage.setItem('key', inputKey);

			goto('/username');
		}
	}
</script>

<div class="centerdiv">
	<h1 class="title">Hey!</h1>
	<p>Paste the code here:</p>

	<input class="clampinput" bind:value={inputKey} />

	<button class="smallButton" onclick={join}>Join</button>
</div>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>
