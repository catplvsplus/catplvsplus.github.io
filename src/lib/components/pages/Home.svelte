<script lang="ts">
    import { cn, popConfetti } from '$lib/helpers/utils';
    import { Button } from "../ui/button";
    import Heart from '$lib/components/svg/Heart.svelte';
    import KissingCat from '$lib/components/svg/KissingCat.svelte';
    import Variables from '$lib/helpers/variables.svelte';
    import ParallaxContainer from '$lib/components/shared/ParallaxContainer.svelte';
</script>

<div class="sm:h-1/2 h-3/4 min-h-fit  flex justify-center items-center relative overflow-x-clip" id="home">
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
            onclick={() => document.querySelector("#about")?.scrollIntoView()}
        >
            Explore More
        </Button>
        {#if !Variables.reducedMotion}
            <ParallaxContainer class="z-10">
                <span class="parallax-object layer -z-10" data-depth="-0.1">
                    <KissingCat class="animate-float size-32 absolute rotate-[25deg] sm:top-[3%] sm:left-[-1.5%]"/>
                </span>
            </ParallaxContainer>
            <ParallaxContainer class="-z-10">
                <span class="parallax-object layer -z-10" data-depth="0.1">
                    <Heart class="animate-float delay-700 size-32 absolute -rotate-[20deg] opacity-90 dark:opacity-80" style="right: -0.5%; top: -15%;"/>
                </span>
            </ParallaxContainer>
        {/if}
    </div>
</div>