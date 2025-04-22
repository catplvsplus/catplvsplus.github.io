<script lang="ts">
	import '$lib/styles/app.pcss';
	import '$lib/styles/global.scss';
  	import { ModeWatcher } from 'mode-watcher';
  	import { Toaster } from '../lib/components/ui/sonner';
  	import Nav from '../lib/components/shared/Nav.svelte';
	let { children } = $props();
</script>

<Toaster/>
<ModeWatcher/>
<Nav/>
{@render children()}
