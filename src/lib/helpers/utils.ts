import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Popper, { type ConfettiOptions } from "$lib/helpers/popper.svelte";
import type { ModeValues, SettingsPropertyValue } from '$lib/helpers/types';
import { languages } from '$lib/helpers/languages';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function popConfetti(e: MouseEvent & { currentTarget: EventTarget }, options?: Omit<ConfettiOptions, 'x'|'y'>) {
	const x = e.clientX;
	const y = e.clientY;

	Popper.addConfetti({ x, y, ...options });
}

export function getSettingsPropertyValue(value: boolean|0): SettingsPropertyValue {
	switch (value) {
		case true: return 'enabled';
		case false: return 'disabled';
		default: return 'auto';
	}
}

export function formatSettingsPropertyValue(value: string): boolean|0 {
	switch (value) {
		case "enabled": return true;
		case "disabled": return false;
		default: return 0;
	}
}

export function getDarkmodeSettingsPropertyValue(value: ModeValues): SettingsPropertyValue {
	switch (value) {
		case 'dark': return 'enabled';
		case 'light': return 'disabled';
		default: return 'auto';
	}
}

export function formatDarkmodePropertyValue(value: string): ModeValues {
	switch (value) {
		case "enabled": return 'dark';
		case "disabled": return 'light';
		default: return 'system';
	}
}

export function findLanguageColor(language: string): string|null {
	const langs = Object.entries(languages);
	const lang = langs.find(([key]) => key.toLowerCase() === language.toLowerCase());

	return lang ? lang[1] : null;
}