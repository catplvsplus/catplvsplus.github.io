<script>
    import { cn, popConfetti } from '$lib/helpers/utils.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Globe, Settings } from '@lucide/svelte';
    import { socialLinks } from '$lib/helpers/constants.js';
    import { pushState } from '$app/navigation';
</script>

<footer class="flex justify-center bg-border/80 px-5 py-10">
    <div class="w-full max-w-2xl flex sm:justify-between sm:flex-row flex-col items-center gap-2">
        <div class="flex flex-col gap-5 text-center items-center sm:items-start sm:text-start sm:w-1/2 w-full">
            <h1 class="font-special-gothic-expanded-one text-muted-foreground hover:text-primary text-4xl">
                <a
                    href="#home"
                    onclick={e => {
                        e.preventDefault();
                        popConfetti(e, {
                            colors: ["hsl(var(--primary))"]
                        });
                    }}
                >
                    cat++
                </a>
            </h1>
            <div class={cn("grid gap-2 w-full max-w-xs grid-cols-6")}>
                {#each socialLinks as socialLink}
                    <Button class="shrink-0 dark:border-none border border-foreground/10" variant="secondary" size="icon" title={socialLink.name} href={socialLink.url} target="_blank">
                        {#if socialLink.icon}
                            <svelte:component this={socialLink.icon}/>
                        {:else}
                            <Globe/>
                        {/if}
                    </Button>
                {/each}
            </div>
        </div>
        <div class="flex sm:flex-col flex-col-reverse items-center gap-5 w-full sm:w-fit">
            <p class="text-muted-foreground leading-10">Made with 🩷 by <a href="https://github.com/catplvsplus" target="_blank" class="text-primary font-semibold">@catplvsplus</a></p>
            <Button
                class="w-full max-w-xs sm:w-fit dark:border-none border border-foreground/10"
                variant="secondary"
                title="Accessibility Settings"
                onclick={() => pushState('', { openVisualEffectsSettings: true })}
            >
                <Settings/> <span>Visual Effects Settings</span>
            </Button>
        </div>
    </div>
</footer>