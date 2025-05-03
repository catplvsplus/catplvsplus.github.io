<script lang="ts">
    import { cn, popConfetti } from '$lib/helpers/utils';
    import { Button } from "../ui/button";
    import Heart from '$lib/components/svg/Heart.svelte';
    import KissingCat from '$lib/components/svg/KissingCat.svelte';
    import Variables from '$lib/helpers/variables.svelte';
    import ParallaxContainer from '$lib/components/shared/ParallaxContainer.svelte';
    import { toast } from 'svelte-sonner';
</script>

<div class="sm:h-1/2 h-3/4 min-h-96 flex justify-center items-center relative overflow-x-clip" id="home">
    <div class="w-full sm:max-w-2xl max-w-md p-5 text-center flex flex-col items-center gap-4 relative">
        <h1 class="font-special-gothic-expanded-one text-7xl">Hi, I'm <span class="text-primary">cat++</span></h1>
        <p class={cn("font-inter text-2xl text-muted-foreground leading-tight sm:max-w-lg max-w-96")}>
            A hobbyist developer with a special interest in javascript and web development
        </p>
        <Button
            onmouseover={e => popConfetti(e, {
                colors: ['hsl(var(--primary))'],
                amount: 10,
                delay: 0
            })}
            onfocus={null}
            onclick={() => {
                document.querySelector("#about")?.scrollIntoView();
                toast.info("This page is still under development and will be updated soon 😉!");
            }}
        >
            Explore More
        </Button>
        {#if !Variables.reducedMotion}
            <ParallaxContainer class="z-10 left-1/2 !-translate-x-1/2 sm:max-w-full max-w-[85%] min-w-[360px]">
                <span class="parallax-object layer -z-10" data-depth={Variables.isMobile ? "-0.5" : "-0.15"}>
                    <KissingCat class="animate-float size-32 absolute rotate-[25deg] sm:top-[3%] sm:left-[-1.5%] top-10 -left-10"/>
                </span>
            </ParallaxContainer>
            <ParallaxContainer class="-z-10" options={{ invertX: true }}>
                <span class="parallax-object layer -z-10" data-depth={Variables.isMobile ? "0.5" : "0.15"}>
                    <Heart class="animate-float delay-700 size-32 absolute -rotate-[20deg] opacity-90 dark:opacity-80" style="right: -0.5%; top: -15%;"/>
                </span>
            </ParallaxContainer>
        {:else}
            <div class={cn("absolute top-0 w-full h-full pointer-events-none z-10 left-1/2 !-translate-x-1/2 sm:max-w-full max-w-[85%] min-w-[360px]")}>
                <span class="absolute top-0 left-0 -z-10">
                    <KissingCat class="size-32 absolute rotate-[25deg] sm:top-[3%] sm:left-[-1.5%] top-10 -left-8"/>
                </span>
            </div>
            <div class={cn("absolute top-0 w-full h-full pointer-events-none -z-10")}>
                <span class="absolute top-0 right-0 -z-10">
                    <Heart class="delay-700 size-32 absolute -rotate-[20deg] opacity-90 dark:opacity-80" style="right: -0.5%; top: -15%;"/>
                </span>
            </div>
        {/if}
    </div>
</div>