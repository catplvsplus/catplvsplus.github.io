<script lang="ts">
	import '$lib/styles/app.pcss';
  	import { ModeWatcher } from 'mode-watcher';
  	import { Toaster } from '../lib/components/ui/sonner';
	let { children } = $props();
</script>

<Toaster/>
<ModeWatcher/>
{@render children()}
