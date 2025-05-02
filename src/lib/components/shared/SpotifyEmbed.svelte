<script lang="ts">
    import { cn } from '$lib/helpers/utils';
    import type { HTMLIframeAttributes } from 'svelte/elements';

    let {
        id = $bindable(),
        width = $bindable("100%"),
        height = $bindable("80"),
        title = $bindable("Song of the day"),
        theme = $bindable("auto"),
        ...props
    }: {
        id: string;
        width?: string;
        height?: string;
        title?: string;
        theme?: "dark" | "auto";
        [key: string]: any;
    } & HTMLIframeAttributes = $props();
</script>

<iframe
        src="https://open.spotify.com/embed/track/{id}?utm_source=generator{theme === 'dark' ? '&theme=0' : ''}"
        {width}
        {height}
        {title}
        allowfullscreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        {...props}
        class={cn("rounded-xl border-none shadow-md", props.class)}
>
</iframe>