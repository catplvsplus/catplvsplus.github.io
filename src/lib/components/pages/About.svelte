<script lang="ts">
    import Variables from "$lib/helpers/variables.svelte";
    import { fade } from 'svelte/transition';
    import { Skeleton } from '../ui/skeleton';
    import SongOfTheDayCard from '$lib/components/shared/SongOfTheDayCard.svelte';
    import StatsCard from '$lib/components/shared/StatsCard.svelte';
</script>

<div class="flex flex-col items-center gap-5 p-5" id="about">
    {#if Variables.user}
        <div class="w-full sm:max-w-2xl max-w-sm p-5 bg-border/80 border shadow-sm rounded-2xl relative z-10" in:fade={{duration: !Variables.reducedMotion ? 300 : 0}}>
            <div class="flex sm:flex-row flex-col sm:gap-5 gap-7 items-center">
                <img
                        id="avatar"
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
        <div class="w-full sm:max-w-2xl max-w-sm p-5 bg-border border shadow-sm rounded-2xl">
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
        <StatsCard/>
        <SongOfTheDayCard/>
    </div>
</div>