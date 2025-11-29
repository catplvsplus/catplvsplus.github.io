<script lang="ts">
    import { page } from '$app/state';
    import { Dialog, DialogContent } from '$lib/components/ui/dialog';
    import { Button } from '$lib/components/ui/button';
    import { X } from '@lucide/svelte';
    import { Skeleton } from '../ui/skeleton';
    import CatWithTearsOfJoy from '../svg/CatWithTearsOfJoy.svelte';

    let isOpen = $derived(!!page.state.openKofi);

    $effect(() => {
        if (!isOpen && page.state.openKofi) {
            history.back();
        }
    });
</script>


<Dialog bind:open={isOpen}>
    <DialogContent class="p-0 overflow-hidden sm:rounded-xl rounded-none h-full sm:max-w-96 w-full sm:max-h-[600px]">
        <Button variant="secondary" size="icon" class="absolute right-2 top-2 z-50 hover:bg-background" onclick={() => isOpen = false}>
            <X/>
        </Button>
        <iframe
            src="https://ko-fi.com/catplvsplus/?hidefeed=true&widget=true&embed=true&preview=true"
            class="border-none size-full absolute top-0 left-0 z-10"
            height="100%"
            title="Ko-fi"
        ></iframe>
        <div class="absolute size-full flex justify-center items-center">
            <CatWithTearsOfJoy class="animate-bounce size-36"/>
        </div>
        <Skeleton class="size-full top-0 left-0 flex justify-center items-center"/>
    </DialogContent>
</Dialog>