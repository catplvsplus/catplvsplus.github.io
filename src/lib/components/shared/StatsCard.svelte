<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import { Skeleton } from '$lib/components/ui/skeleton/index.js';
    import { fade } from 'svelte/transition';
    import { ExternalLink } from '@lucide/svelte';
    import Variables from '$lib/helpers/variables.svelte';
</script>

<div class="sm:w-1/2 w-full p-5 bg-border/80 border shadow-sm rounded-2xl" in:fade={{duration: !Variables.reducedMotion ? 300 : 0}}>
    {#snippet Stat(label: string, value: string|null)}
        <div class="flex flex-col gap-2">
            <span class="text-muted-foreground">{label}</span>
            <span class="font-semibold">
                {#if value}
                    <span in:fade={{  duration: !Variables.reducedMotion ? 300 : 0 }}>{value}</span>
                {:else}
                    <Skeleton class="h-4 rounded-full w-10 max-w-full"/>
                {/if}
            </span>
        </div>
    {/snippet}
    <div class="flex items-center justify-between mb-3">
        <h2 class="font-special-gothic-expanded-one sm:text-2xl text-xl">Stats</h2>
        {#if Variables.user}
            <Button variant="outline" size="sm" class="h-8 rounded-lg bg-background/10" title="View GitHub Profile" href={Variables.user?.html_url} target="_blank" rel="noopener noreferrer">
                View All <ExternalLink/>
            </Button>
        {:else}
            <Skeleton class="h-8 rounded-lg w-20 max-w-full"/>
        {/if}
    </div>
    <div class="grid sm:grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] grid-cols-3 gap-4">
        {@render Stat('Followers', Variables.user?.followers.toLocaleString() ?? null)}
        {@render Stat('Following', Variables.user?.following.toLocaleString() ?? null)}
        {@render Stat('Repos', Variables.user?.public_repos.toLocaleString() ?? null)}
    </div>
</div>