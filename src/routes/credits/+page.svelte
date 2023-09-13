<script lang="ts">
    import "iconify-icon";

    type Credit = {
        icon: string,
        link?: string,
        creditFor: string,
        creditSrc: string
    }

    const credits: Credit[] = [
        {
            icon: 'mdi:github',
            link: 'https://github.com/willm0602/',
            creditFor: 'This site was made by',
            creditSrc: 'Will Migdol'
        },
        {
            icon: 'mdi:film-open',
            link: 'https://www.themoviedb.org/?language=en-US',
            creditFor: 'All film and tv data was provided by',
            creditSrc: 'TMDB'
        },
        {
            icon: 'mdi:mdi',
            link: 'https://iconify.design/',
            creditFor: 'Icons were provided by',
            creditSrc: 'Iconify'
        },
        {
            icon: 'vscode-icons:file-type-svelte',
            link: 'https://kit.svelte.dev/',
            creditFor: 'This app was built using',
            creditSrc: 'SvelteKit'
        },
        {
            icon: 'gg:vercel',
            link: 'https://vercel.com/',
            creditFor: 'This site is hosted using',
            creditSrc: 'Vercel'
        }
    ]
</script>

<div class="w-full h-full">
    <h1 class="h1 text-center mt-8 mb-4">Credits</h1>
    {#each credits as credit}
    <div class="flex w-4/5 mx-auto mb-4 items-center justify-center">
        <iconify-icon icon="{credit.icon}" class="text-4xl mr-2"/>
        <span class="mr-2">{credit.creditFor}</span>
        <a class="text-blue-500 hover:underline" href="{credit.link}">{credit.creditSrc}</a>
    </div>
    {/each}
</div>