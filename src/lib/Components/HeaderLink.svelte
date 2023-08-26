<script lang="ts">
    export let route: string = "";
    export let css: string = "";
    export let dontReload = false;
</script>

<a data-sveltekit-reload={dontReload ? 'off' : true} class="{css} h-full flex items-center pt-2 pb-0 px-8 hover:bg-surface-900 bg-surface-800" href="{route}">
    <slot/>
</a>