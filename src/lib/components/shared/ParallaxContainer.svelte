<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import Parallax from 'parallax-js';
    import { parallaxOptions } from '$lib/helpers/constants';
    import { cn } from '$lib/helpers/utils';

    let {
        options,
        children,
        ...props
    }: {
        options?: Partial<Parallax.ParallaxOptions>;
        children?: Snippet<[]>;
        [key: string]: any;
    } & HTMLAttributes<HTMLDivElement> = $props();

    let container: HTMLDivElement = $state()!;

    onMount(() => {
        const parallax = new Parallax(container, {
            ...parallaxOptions,
            ...options
        });

        return () => parallax.destroy();
    })
</script>

<div {...props} class={cn("!absolute top-0 left-0 w-full h-full pointer-events-none", props.class)} bind:this={container}>
    {@render children?.()}
</div>