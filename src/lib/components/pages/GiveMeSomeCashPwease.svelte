<script lang="ts">
    import { cn, popConfetti } from '$lib/helpers/utils.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { SiKofi } from '@icons-pack/svelte-simple-icons';
    import { IsInViewport } from 'runed';
    import { blur, fade } from 'svelte/transition';
    import Confetti from 'svelte-confetti';
    import ParallaxContainer from '$lib/components/shared/ParallaxContainer.svelte';
    import Variables from '$lib/helpers/variables.svelte';
    import Cupcake from '$lib/components/svg/Cupcake.svelte';
    import SmilingCatWithHeartEyes from '$lib/components/svg/SmilingCatWithHeartEyes.svelte';
    import { pushState } from '$app/navigation';
    import { confettiColors } from '$lib/helpers/constants';

    Confetti;

    let target: HTMLDivElement = $state()!;
    let showConfetti: boolean = $state(false);

    const isInViewport = new IsInViewport(() => target, {
        threshold: 1
    });
</script>

<style lang="scss">
    .text-title {

        .support {
          color: hsl(var(--primary));
        }
    }
</style>

{#snippet InlineConfetti()}
    <Confetti
        colorArray={['hsl(var(--primary))', ...confettiColors]}
        delay={[0, Math.random() * 1000]}
        x={[-0.5, 0.5]}
        y={[-0.5, 0.5]}
        fallDistance="20px"
        amount={Math.random() * 50}
        duration={Math.random() * 3000}
        destroyOnComplete={true}
    />
{/snippet}

<div class={cn("w-full h-[200%] min-h-[600px] pt-72 pb-40 flex justify-center items-start")}>
    <div class="sticky top-1/2 -translate-y-1/2 w-full max-w-screen-lg flex flex-col items-center gap-16 overflow-x-clip" bind:this={target}>
        {#if isInViewport.current}
            <div class="relative">
                <h3 class="font-special-gothic-expanded-one z-10 relative sm:text-6xl text-4xl px-5 text-center sm:max-w-lg max-w-96 text-title" transition:blur={{ duration: 1000 }}>
                    Want to <span class="support">support</span> my work?
                </h3>
            </div>
            <div class="relative">
                <span transition:blur={{ delay: 200, duration: 1000 }} onintroend={() => showConfetti = true} onoutroend={() => showConfetti = false}>
                    <Button
                        href="https://ko-fi.com/catplusplus"
                        onclick={e => {
                            e.preventDefault();
                            pushState('', {
                                openKofi: true
                            });
                        }}
                        onmouseover={e => popConfetti(e, {
                            colors: ['hsl(var(--primary))', ...confettiColors],
                            amount: 10
                        })}
                        class="donate-btn rounded-xl relative sm:h-12 sm:px-6 px-5 sm:text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary [&_svg]:size-5 hover:bg-gradient-to-br hover:from-primary hover:to-primary/80"
                    >
                        <span class="flex items-center gap-2 relative z-10">
                            <SiKofi/>
                            <span class="text">Buy me a coffee</span>
                        </span>
                    </Button>
                </span>
                {#if !Variables.reducedMotion}
                    <ParallaxContainer class="z-10">
                        <span in:fade|global={{ delay: 1000 }} class="parallax-object layer" data-depth={Variables.isMobile ? "-0.5" : "-0.15"}>
                            <SmilingCatWithHeartEyes class="animate-float shadow-sm size-20 absolute rotate-[25deg] -bottom-10 -right-12"/>
                        </span>
                    </ParallaxContainer>
                    <ParallaxContainer class="-z-10">
                        <span in:fade|global={{ delay: 1200 }} class="parallax-object layer" data-depth={Variables.isMobile ? "0.5" : "0.15"}>
                            <Cupcake class="animate-float size-20 absolute -rotate-[25deg] -top-10 -left-12"/>
                        </span>
                    </ParallaxContainer>
                {:else}
                    <div class="z-10 absolute h-full w-full pointer-events-none" transition:fade|global={{ delay: 1000 }}>
                        <SmilingCatWithHeartEyes class="animate-float shadow-sm size-20 absolute rotate-[25deg] -bottom-0 -right-14"/>
                    </div>
                    <div class="-z-10 absolute h-full w-full pointer-events-none" transition:fade|global={{ delay: 1200 }}>
                        <Cupcake class="animate-float size-20 absolute -rotate-[25deg] -top-20 -left-12"/>
                    </div>
                {/if}
                {#if showConfetti && Variables.enableConfetti}
                    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {@render InlineConfetti()}
                    </span>
                    <span class="absolute top-1/2 left-0">
                        {@render InlineConfetti()}
                    </span>
                    <span class="absolute top-1/2 right-0">
                        {@render InlineConfetti()}
                    </span>
                {/if}
            </div>
        {/if}
    </div>
</div>