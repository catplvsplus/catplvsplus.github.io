import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Popper, { type ConfettiOptions } from "$lib/helpers/popper.svelte";
import type {IGithubLangStat, LangStat} from "$lib/helpers/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function popConfetti(e: MouseEvent & { currentTarget: EventTarget }, options?: Omit<ConfettiOptions, 'x'|'y'>) {
	const x = e.clientX;
	const y = e.clientY;

	Popper.addConfetti({ x, y, ...options });
}

export function calculateLangsStats(langs: IGithubLangStat): LangStat[] {
	const total = Object.values(langs.langs).reduce((a, b) => a + b, 0);

	const stats: LangStat[] = [];

	for (const lang of Object.keys(langs.langs)) {
		const count = langs.langs[lang];

		stats.push({
			lang,
			count,
			percent: (count / total) * 100
		});
	}

	return stats;
}