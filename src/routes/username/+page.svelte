<script>
	import { goto } from '$app/navigation';

	let userName = $state('');

	function storeUser() {
		if (userName != '') {
			localStorage.setItem('username', userName);
			console.log(localStorage.getItem('username'));
			goto('/');
		}
	}
</script>

<div class="centerdiv">
	<h1 class="title">Great!</h1>
	<p>Enter your desired username:</p>

	<input class="clampinput" bind:value={userName} />

	<button class="smallButton" onclick={storeUser}>Save</button>
</div>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>
