import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Popper from "$lib/helpers/popper.svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function popConfetti(e: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) {
	const x = e.clientX;
	const y = e.clientY;

	Popper.addConfetti(x, y);
}