<script lang="ts">
    import { cn } from '$lib/helpers/utils.js';
    import { RefreshCcw } from '@lucide/svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import { blur } from 'svelte/transition';
    import SpotifyEmbed from '$lib/components/shared/SpotifyEmbed.svelte';
    import Variables from '$lib/helpers/variables.svelte.js';
</script>

<div class={cn("sm:w-[60%] md:w-3/4 sm:max-w-96 w-full p-5 bg-border/80 border shadow-sm rounded-2xl")}>
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