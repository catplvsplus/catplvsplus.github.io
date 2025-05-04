<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";
	import Variables from '$lib/helpers/variables.svelte';

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	toastOptions={{
		classes: {
			toast: `group toast ${Variables.transparency ? 'group-[.toaster]:bg-background/80 backdrop-blur-md' : 'group-[.toaster]:bg-background'} group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg`,
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
		},
	}}
	{...restProps}
/>
