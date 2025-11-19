<script lang="ts">
    import { page } from '$app/state';
    import { MediaQuery } from 'svelte/reactivity';
    import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '$lib/components/ui/drawer/index.js';
    import {
      Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
    } from '$lib/components/ui/dialog/index.js';
    import { Label } from '$lib/components/ui/label';
    import { GalleryHorizontalEnd, Palette, PartyPopper, Sparkles } from '@lucide/svelte';
    import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select/index.js';
    import Variables from '$lib/helpers/variables.svelte';
    import {
      formatSettingsPropertyValue,
      getSettingsPropertyValue
    } from '$lib/helpers/utils';
    import { settingsSelectPropertyValues } from '$lib/helpers/constants';
    import { Button } from '$lib/components/ui/button';
    import { toast } from 'svelte-sonner';
    import { userPrefersMode } from 'mode-watcher';

    let isOpen = $derived(!!page.state.openVisualEffectsSettings);
    let reducedTransparency = $state(getSettingsPropertyValue(Variables.reducedTransparencyStore.current));
    let reducedMotion = $state(getSettingsPropertyValue(Variables.reducedMotionStore.current));
    let confetti = $state(getSettingsPropertyValue(Variables.enableConfettiStore.current));
    let theme = $state(userPrefersMode.current);

    let reducedTransparencyValue = $derived(formatSettingsPropertyValue(reducedTransparency));
    let reducedMotionValue = $derived(formatSettingsPropertyValue(reducedMotion));
    let enableConfettiValue = $derived(formatSettingsPropertyValue(confetti));

    $effect(() => {
        if (!isOpen && page.state.openVisualEffectsSettings) {
            history.back();
        }
    });

    function reset() {
        reducedTransparency = 'auto';
        reducedMotion = 'auto';
        confetti = 'auto';

        Variables.reducedTransparencyStore.current = reducedTransparencyValue;
        Variables.reducedMotionStore.current = reducedMotionValue;
        Variables.enableConfettiStore.current = enableConfettiValue;
        userPrefersMode.current = 'system';

        toast.info("Applied default visual settings");
    }

    function updateSettings() {
        Variables.reducedTransparencyStore.current = reducedTransparencyValue;
        Variables.reducedMotionStore.current = reducedMotionValue;
        Variables.enableConfettiStore.current = enableConfettiValue;
        userPrefersMode.current = theme;

        toast.info("Visual settings has been applied");
    }

    const isDesktop = new MediaQuery("(min-width: 640px)", true);
</script>

{#snippet VisualSettings()}
    <div class="flex flex-col gap-3 w-full">
        <div class="flex justify-between items-center w-full">
            <Label class="flex items-center gap-2" for="theme-option"><Palette class="shrink-0 text-primary" size="1.5em"/>Theme</Label>
            <Select type="single" bind:value={theme} onValueChange={updateSettings}>
                <SelectTrigger id="theme-option" class="w-fit gap-2 capitalize">
                    {userPrefersMode.current}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="system" label="System">System</SelectItem>
                    <SelectItem value="dark" label="Dark">Dark</SelectItem>
                    <SelectItem value="light" label="Light">Light</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div class="flex justify-between items-center w-full">
            <Label class="flex items-center gap-2" for="reduced-transparency-option"><Sparkles class="shrink-0 text-primary" size="1.5em"/>Reduced Transparecy</Label>
            <Select type="single" bind:value={reducedTransparency} onValueChange={updateSettings}>
                <SelectTrigger id="reduced-transparency-option" class="w-fit gap-2 capitalize">
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
            <Label class="flex items-center gap-2" for="reduced-motion-option"><GalleryHorizontalEnd class="shrink-0 text-primary" size="1.5em"/>Reduced Motion</Label>
            <Select type="single" bind:value={reducedMotion} onValueChange={updateSettings}>
                <SelectTrigger id="reduced-motion-option" class="w-fit gap-2 capitalize">
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
                <Label class="flex items-center gap-2" for="enable-confetti-option"><PartyPopper class="shrink-0 text-primary" size="1.5em"/> Pop Confetti</Label>
                <Select type="single" disabled={Variables.reducedMotion} bind:value={confetti} onValueChange={updateSettings}>
                    <SelectTrigger id="enable-confetti-option" class="w-fit gap-2 capitalize">
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
                <Button variant="secondary" onclick={() => isOpen = false}>Done</Button>
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
                <Button variant="default" onclick={() => isOpen = false}>Done</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
{/if}