<script lang="ts">
    export let route: string = "";
    export let css: string = "";
</script>

<a class="{css} h-full flex items-center pt-2 pb-0 px-8 hover:bg-surface-900 ml-12 bg-surface-800" href="{route}">
    <slot/>
</a>