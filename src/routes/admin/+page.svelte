<script lang="ts">
	import LoggedInAdminPage from "./LoggedInAdminPage.svelte";
	import LoggedOutAdminPage from "./LoggedOutAdminPage.svelte";

    export let data;
    const {isLoggedIn} = data;
</script>

{#if isLoggedIn}
    <LoggedInAdminPage />
{:else}
    <LoggedOutAdminPage/>
{/if}