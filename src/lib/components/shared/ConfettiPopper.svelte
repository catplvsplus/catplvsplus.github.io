<script lang="ts">
    import Popper from '$lib/helpers/popper.svelte';
    import Variables from '$lib/helpers/variables.svelte';
    import Confetti from 'svelte-confetti';
</script>

{#if !Variables.reducedMotion && !Variables.isMobile && Variables.enableConfetti}
    <div class="h-full w-full fixed pointer-events-none z-40">
        {#each Popper.confettis as confetti}
            <div class="absolute" style="top: {confetti.y}px; left: {confetti.x}px;">
                <Confetti
                    rounded={confetti.rounded}
                    colorArray={confetti.colors ?? []}
                    delay={[0, confetti.delay ?? Popper.delay]}
                    x={[-0.5, 0.5]}
                    y={[-0.5, 0.5]}
                    fallDistance="{Popper.fallDistance}px"
                    amount={confetti.amount ?? Popper.amount}
                    duration={Popper.duration}
                />
            </div>
        {/each}
    </div>
{/if}