<script lang="ts">
    import { base } from "$app/paths";
    import { mode, toggleMode } from 'mode-watcher';
    import { Sun, Moon, List, X } from '@lucide/svelte';
    import { Button } from '../ui/button';
    import { blur, fade, slide } from 'svelte/transition';
    import { cn } from '../../helpers/utils';
    import { onClickOutside, PressedKeys } from 'runed';
    import { beforeNavigate, goto } from '$app/navigation';

    let menu: HTMLDivElement = $state()!;
    let menuOpen = $state(false);

    const keys = new PressedKeys();

    onClickOutside(() => menu, () => menuOpen = false);

    const isEscapePressed = $derived(keys.has("Escape"));

    $effect(() => {
        if (isEscapePressed && menuOpen) {
            menuOpen = false
        }
    });

    beforeNavigate(() => menuOpen = false);
</script>

{#snippet NavLink(label: string, link: string)}
    <a
        class="p-2 rounded-md hover:bg-primary/80 hover:text-primary-foreground transition-colors duration-300"
        href={link}
        onclick={e => {
            e.preventDefault();

            menuOpen = false;
            goto(link);
        }}
    >
        {label}
    </a>
{/snippet}

<nav
    class={cn(
        "fixed left-0 flex items-center justify-center w-full pointer-events-none p-4 z-50 transition-all duration-200 h-auto",
        menuOpen && 'h-full'
    )}
>
    <div
        bind:this={menu}
        class={cn(
            "flex flex-col w-full max-h-full max-w-screen-sm overflow-hidden rounded-xl pointer-events-auto dark:bg-background/80 bg-background/85 backdrop-blur-md border shadow-lg transition-[max-width] duration-200",
            menuOpen && 'max-w-md'
        )}
    >
        <div class="flex items-center justify-between gap-2 h-16 w-full  p-3">
            <h1 class="text-2xl text-primary font-normal text-shadow-lg text-shadow-primary font-special-gothic-expanded-one px-2">
                <a href="{base}/">cat++</a>
            </h1>
            <div>
                <Button variant="outline" size="icon" class="bg-background/50" onclick={() => toggleMode()}>
                    {#if mode.current === 'dark'}
                        <Sun/>
                    {:else}
                        <Moon/>
                    {/if}
                </Button>
                <Button size="icon" onclick={() => menuOpen = !menuOpen}>
                    {#if menuOpen}
                        <X/>
                    {:else}
                        <List/>
                    {/if}
                </Button>
            </div>
        </div>
        {#if menuOpen}
            <style>
                html {
                    overflow: hidden;
                    pointer-events: none;
                }
            </style>
            <div class="w-full flex flex-col" transition:slide={{ axis: 'y', delay: !menuOpen ? 0 : 200, duration: 300 }}>
                <div
                    class="w-full p-3 flex flex-col gap-2 text-lg font-thin font-special-gothic-expanded-one uppercase"
                    transition:blur={{ amount: 30, opacity: 0, delay: 100, duration: 200 }}
                >
                    {@render NavLink('Home', `${base}/#`)}
                    {@render NavLink('About', `${base}/#about`)}
                    {@render NavLink('Projects', `${base}/#projects`)}
                    {@render NavLink('Contact', `${base}/#contact`)}
                </div>
            </div>
        {/if}
    </div>
</nav>
<div class={cn("fixed top-0 left-0 bg-transparent backdrop-blur-none h-full w-full z-40 pointer-events-none transition-all duration-500", menuOpen && 'bg-background/50 backdrop-blur-sm')}>
</div>