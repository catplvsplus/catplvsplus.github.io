<script lang="ts">
    import { cn, popConfetti } from '../../helpers/utils';
    import { Button } from "../ui/button";
</script>

<div class="sm:h-1/2 h-3/4 min-h-fit  flex justify-center items-center relative" id="home">
    <div class="w-full max-w-2xl p-5 text-center flex flex-col items-center gap-4">
        <h1 class="font-special-gothic-expanded-one text-7xl">Hi, I'm <span class="text-primary">cat++</span></h1>
        <p class={cn("font-inter text-2xl text-muted-foreground leading-tight max-w-lg")}>
            A hobbyist developer with a special interest in javascript and web development
        </p>
        <Button
            onmouseover={e => popConfetti(e, {
                colors: ['hsl(var(--primary))'],
                amount: 10,
                delay: 0
            })}
            onfocus={null}
            onclick={() => window.scrollTo(0, document.body.scrollHeight)}
        >
            Explore More
        </Button>
    </div>
</div>