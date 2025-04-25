<script lang="ts">
	import '$lib/styles/app.pcss';
	import '$lib/styles/global.scss';
  	import { ModeWatcher } from 'mode-watcher';
  	import { Toaster } from '../lib/components/ui/sonner';
  	import Nav from '../lib/components/shared/Nav.svelte';
  	import { isMobile } from 'is-mobile';
  import { cn } from '../lib/helpers/utils';

	let { children } = $props();

	let isMobileScreen = isMobile();
</script>

<Toaster/>
<ModeWatcher/>
<Nav/>

<div class={cn("w-full h-full", isMobileScreen ? 'pb-[6.125rem]' : 'pt-[6.125rem]')}>
	{@render children()}
</div>
