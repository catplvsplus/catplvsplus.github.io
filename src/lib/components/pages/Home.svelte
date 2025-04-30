<script lang="ts">
    import { cn } from '../../helpers/utils';
    import { Button } from "../ui/button";
    import Variables from "$lib/helpers/variables.svelte";
</script>

<div class="h-1/2 min-h-fit flex justify-center items-center relative" id="home">
    <div class="w-full max-w-2xl p-5 text-center flex flex-col items-center gap-4">
        <h1 class="font-special-gothic-expanded-one text-7xl">Hi, I'm <span class="text-primary">cat++</span></h1>
        <p class={cn("font-inter text-2xl text-muted-foreground leading-tight max-w-lg")}>
            A hobbyist developer with a special interest in javascript and web development
        </p>
        <Button>Explore More</Button>
    </div>
</div>