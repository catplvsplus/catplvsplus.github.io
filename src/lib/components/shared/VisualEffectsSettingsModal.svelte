<script lang="ts">
    import { page } from '$app/state';
    import { MediaQuery } from 'svelte/reactivity';
    import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '$lib/components/ui/drawer/index.js';
    import {
        Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
    } from '$lib/components/ui/dialog/index.js';
    import { Label } from '$lib/components/ui/label';
    import { GalleryHorizontalEnd, PartyPopper, Sparkles } from '@lucide/svelte';
    import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select/index.js';
    import Variables from '$lib/helpers/variables.svelte';
    import { formatSettingsPropertyValue, getSettingsPropertyValue } from '$lib/helpers/utils';
    import { settingsSelectPropertyValues } from '$lib/helpers/constants';
    import { Button } from '$lib/components/ui/button';
    import { toast } from 'svelte-sonner';

    let isOpen = $derived(!!page.state.openVisualEffectsSettings);
    let reducedTransparency = $state(getSettingsPropertyValue(Variables.reducedTransparencyStore.current));
    let reducedMotion = $state(getSettingsPropertyValue(Variables.reducedMotionStore.current));
    let confetti = $state(getSettingsPropertyValue(Variables.enableConfettiStore.current));

    let reducedTransparencyValue = $derived(formatSettingsPropertyValue(reducedTransparency));
    let reducedMotionValue = $derived(formatSettingsPropertyValue(reducedMotion));
    let enableConfettiValue = $derived(formatSettingsPropertyValue(confetti));

    $effect(() => {
        if (!isOpen && page.state.openVisualEffectsSettings) {
            history.back();
        }
    });

    function reset() {
        Variables.reducedMotionStore.current = 0;
        Variables.reducedTransparencyStore.current = 0;
        Variables.enableConfettiStore.current = 0;

        toast("Applied default visual settings");
    }

    const isDesktop = new MediaQuery("(min-width: 640px)", true);
</script>

{#snippet VisualSettings()}
    <div class="flex flex-col gap-3 w-full">
        <div class="flex justify-between items-center w-full">
            <Label class="flex items-center gap-2"><Sparkles class="shrink-0 text-primary" size="1.5em"/>Reduced Transparecy Effects</Label>
            <Select type="single" bind:value={reducedTransparency} onValueChange={() => Variables.reducedTransparencyStore.current = reducedTransparencyValue}>
                <SelectTrigger class="w-fit gap-2 capitalize">
                    {getSettingsPropertyValue(Variables.reducedTransparencyStore.current)}
                </SelectTrigger>
                <SelectContent>
                    {#each settingsSelectPropertyValues as { label, value }}
                        <SelectItem {value} {label}>{label}</SelectItem>
                    {/each}
                </SelectContent>
            </Select>
        </div>
        <div class="flex justify-between items-center w-full">
            <Label class="flex items-center gap-2"><GalleryHorizontalEnd class="shrink-0 text-primary" size="1.5em"/>Reduced Motion</Label>
            <Select type="single" bind:value={reducedMotion} onValueChange={() => Variables.reducedMotionStore.current = reducedMotionValue}>
                <SelectTrigger class="w-fit gap-2 capitalize">
                    {getSettingsPropertyValue(Variables.reducedMotionStore.current)}
                </SelectTrigger>
                <SelectContent>
                    {#each settingsSelectPropertyValues as { label, value }}
                        <SelectItem {value} {label}>{label}</SelectItem>
                    {/each}
                </SelectContent>
            </Select>
        </div>
        {#if !Variables.isMobile}
            <div class="flex justify-between items-center w-full">
                <Label class="flex items-center gap-2"><PartyPopper class="shrink-0 text-primary" size="1.5em"/> Pop Confetti</Label>
                <Select type="single" disabled={Variables.reducedMotion} bind:value={confetti} onValueChange={() => Variables.enableConfettiStore.current = enableConfettiValue}>
                    <SelectTrigger class="w-fit gap-2 capitalize">
                        {getSettingsPropertyValue(Variables.enableConfettiStore.current)}
                    </SelectTrigger>
                    <SelectContent>
                        {#each settingsSelectPropertyValues as { label, value }}
                            <SelectItem {value} {label}>{label}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
            </div>
        {/if}
    </div>
{/snippet}

{#if isDesktop.current}
    <Dialog bind:open={isOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Visual Effects Settings
                </DialogTitle>
                <DialogDescription>
                    Settings for various visual effects used in this page
                </DialogDescription>
            </DialogHeader>
            {@render VisualSettings()}
            <DialogFooter>
                <Button variant="ghost" onclick={() => reset()}>Reset</Button>
                <Button variant="secondary" onclick={() => isOpen = false}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
{:else}
    <Drawer bind:open={isOpen}>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Visual Effects Settings</DrawerTitle>
                <DialogDescription>Settings for various visual effects used in this page</DialogDescription>
            </DrawerHeader>
            <div class="p-5">
                {@render VisualSettings()}
            </div>
            <DrawerFooter>
                <Button variant="secondary" onclick={() => reset()}>Reset</Button>
                <Button variant="default" onclick={() => isOpen = false}>Close</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
{/if}