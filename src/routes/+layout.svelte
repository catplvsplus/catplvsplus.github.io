<script lang="ts">
	import '$lib/styles/app.pcss';
	import '$lib/styles/global.scss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '../lib/components/ui/sonner';
	import Nav from '../lib/components/shared/Nav.svelte';
	import { cn } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	import Variables from '../lib/helpers/variables.svelte';
	import { toast } from 'svelte-sonner';
	import ConfettiPopper from '../lib/components/shared/ConfettiPopper.svelte';
	import VisualEffectsSettingsModal from '$lib/components/shared/VisualEffectsSettingsModal.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';

	let { children } = $props();

	async function updateServiceWorker() {
        const registration = await navigator.serviceWorker.ready;

        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            newWorker?.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                    toast.info('New update is available!', {
                        duration: 60000,
                        action: {
                            label: 'Reload',
                            onClick: () => {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                            }
                        }
                    });
                }
            });
        });
    }

	onMount(async () => {
		await updateServiceWorker();
		await Variables.fetch();
	});
</script>

<ConfettiPopper/>
<Toaster/>
<ModeWatcher/>
<Nav/>
<VisualEffectsSettingsModal/>

<div class={cn("w-full h-full pt-[6.125rem]")}>
	{@render children()}
	<Footer/>
</div>