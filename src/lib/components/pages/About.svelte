<script lang="ts">
    import Variables from "$lib/helpers/variables.svelte";
    import { blur, fade } from 'svelte/transition';
    import { Skeleton } from '../ui/skeleton';
    import { Button } from '../ui/button';
    import { ExternalLink, RefreshCcw } from '@lucide/svelte';
    import SpotifyEmbed from '$lib/components/shared/SpotifyEmbed.svelte';
    import { cn } from '$lib/helpers/utils';

    let avatar: HTMLImageElement|null = $state(null);
</script>

<div class="flex flex-col items-center gap-5 p-5" id="about">
    {#if Variables.user}
        <div class="w-full sm:max-w-2xl max-w-sm p-5 bg-foreground/5 border shadow-sm rounded-2xl" in:fade={{duration: !Variables.reducedMotion ? 300 : 0}}>
            <div class="flex sm:flex-row flex-col sm:gap-5 gap-7 items-center">
                <img
                    id="avatar"
                    bind:this={avatar}
                    src={Variables.user?.avatar_url}
                    class="size-52 sm:size-32 shrink-0 rounded-full object-cover border"
                    alt=""
                >
                <div class="flex flex-col gap-5 sm:gap-2">
                    <h1 class="font-special-gothic-expanded-one text-lg sm:text-2xl opacity-80 sm:text-start text-center">
                        <a
                            href={Variables.user?.html_url}
                            class="hover:text-primary focus:text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @{Variables.user?.login}
                        </a>
                    </h1>
                    <p class="text-muted-foreground whitespace-break-spaces break-words">{Variables.user?.bio}</p>
                </div>
            </div>
        </div>
    {:else}
        <div class="w-full sm:max-w-2xl max-w-sm p-5 bg-foreground/5 border shadow-sm rounded-2xl">
            <div class="flex sm:flex-row flex-col sm:gap-5 gap-7 items-center">
                <Skeleton class="size-52 sm:size-32 shrink-0 rounded-full object-cover border" />
                <div class="flex flex-col gap-5 sm:gap-4 sm:py-1 sm:items-start items-center">
                    <Skeleton class="h-6 rounded-full w-52"/>
                    <div class="flex flex-col gap-1 w-full">
                        <Skeleton class="h-4 rounded-full w-1/4 max-w-full"/>
                        <Skeleton class="h-4 rounded-full w-2/3 max-w-full"/>
                        <Skeleton class="h-4 rounded-full max-w-full"/>
                    </div>
                </div>
            </div>
        </div>
    {/if}
    <div class="flex sm:flex-row flex-col gap-5 w-full sm:max-w-2xl max-w-sm">
        <div class="sm:w-1/2 w-full p-5 bg-foreground/5 border shadow-sm rounded-2xl" in:fade={{duration: !Variables.reducedMotion ? 300 : 0}}>
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
        <div class={cn("sm:w-[60%] md:w-3/4 sm:max-w-96 w-full p-5 bg-foreground/5 border shadow-sm rounded-2xl")} in:fade={{duration: !Variables.reducedMotion ? 300 : 0}}>
            <div class="flex items-center justify-between mb-3">
                <h2 class="font-special-gothic-expanded-one sm:text-2xl text-xl">Song of the day</h2>
                <Button variant="outline" size="icon" class="h-8 w-8 p-0 rounded-lg bg-background/10" onclick={() => Variables.refreshSongId()} title="Refresh song of the day ">
                    <RefreshCcw/>
                </Button>
            </div>
            <div class={cn("h-20 min-w-56 w-full relative")}>
                {#key Variables.songId}
                    <div
                        class="absolute top-0 left-0 w-full"
                        in:blur={{ duration: !Variables.reducedMotion ? 500 : 0, delay: !Variables.reducedMotion ? 400 : 0 }}
                        out:blur={{ duration: !Variables.reducedMotion ? 500 : 0 }}
                    >
                        <SpotifyEmbed id={Variables.songId} class="h-20"/>
                    </div>
                {/key}
            </div>
        </div>
    </div>
</div>