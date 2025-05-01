import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Popper, { type ConfettiOptions } from "$lib/helpers/popper.svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function popConfetti(e: MouseEvent & { currentTarget: EventTarget }, options?: Omit<ConfettiOptions, 'x'|'y'>) {
	const x = e.clientX;
	const y = e.clientY;

	Popper.addConfetti({ x, y, ...options });
}

export async function calculateLangsStats(langs: IGithubLangStat) {
	const total = Object.values(langs?.langs ?? {}).reduce((a, b) => a + b, 0) || 0;
}