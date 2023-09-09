<script>

	import { enhance } from "$app/forms";

</script>
<form method="post" 
    action="/admin?/clearCacheKey"
    class="flex p-5"
    use:enhance={() => {
    return async ({result}) => {
        console.log(result);
    }}}
>
    <h2 class="h4">Clear Cache Key</h2>
    <input type="text" class="input w-40 mx-5" placeholder="Cache Key" name="cache-key">
    <button type="submit" class="button btn variant-filled-secondary">Clear Cache Key</button>
</form>