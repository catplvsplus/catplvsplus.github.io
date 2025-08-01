<script lang="ts">
    import { globalUsername, socialLinks } from '$lib/helpers/constants';
    import { Mail } from '@lucide/svelte';
    import { SiGithub, SiDiscord } from '@icons-pack/svelte-simple-icons';
    import { IsInViewport } from 'runed';
    import { fly } from 'svelte/transition';
    import Variables from '$lib/helpers/variables.svelte';

    let target: HTMLDivElement = $state()!;

    const email = (socialLinks.find(s => s.name === "Email")?.url || "").replace("mailto:", "");
    const isInViewport = new IsInViewport(() => target);
</script>

{#snippet ContactLink(label: string, url: string, icon: any,)}
    <div in:fly={{ delay: 200, duration: Variables.reducedMotion ? 0 : 1000, y: 20 }} class="flex items-center gap-2">
        <span class="h-10 w-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
            <svelte:component this={icon}/>
        </span>
        <h3>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {label}
            </a>
        </h3>
    </div>
{/snippet}

<div class="flex justify-center p-5 py-32" id="contact" bind:this={target}>
    <div class="w-full sm:max-w-2xl max-w-sm sm:flex-row flex-col flex gap-10 sm:gap-2">
        <div class="sm:w-1/2 w-full shrink-0">
            {#if isInViewport.current}
                <h1 in:fly={{ duration: Variables.reducedMotion ? 0 : 1000, y: 30 }} class="text-5xl sm:text-4xl tracking-wide font-bold font-special-gothic-expanded-one">
                    Let's create something great <span class="text-primary">together</span>
                </h1>
            {/if}
        </div>
        <div class="w-full sm:px-5 flex gap-2 flex-col font-medium">
            {#if isInViewport.current}
                {@render ContactLink(email, `mailto:${email}`, Mail)}
                {@render ContactLink(`@${globalUsername}`, socialLinks.find(s => s.name === "Github")?.url ?? "", SiGithub)}
                <!-- {@render ContactLink(`@bvtterswt`, socialLinks.find(s => s.name === "Discord")?.url ?? "", SiDiscord)} -->
            {/if}
        </div>
    </div>
</div>