<script>
	import { goto } from '$app/navigation';

	function create() {
		goto('/create');
	}
	function join() {
		goto('/joinGroup');
	}
</script>

<div class="centerdiv">
	<h1 class="title">Welcome!</h1>

	<p>Let's get started!</p>

	<button class="bigbutton" onclick={create}>Create a Group</button>
	<div class="divider"></div>
	<button class="bigbutton" onclick={join}>Join a Group</button>
</div>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
	href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
	rel="stylesheet"
/>
