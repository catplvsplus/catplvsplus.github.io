import { MediaQuery } from 'svelte/reactivity';
import type { IGithubRepo, IGithubUser, SongOfTheDay } from './types';
import { PersistedState } from 'runed';
import isMobile from 'is-mobile';
import { favoriteSongIds } from '$lib/helpers/constants';

export class Variables {
    public static username: string = 'catplvsplus';
    public static repositories: string[] = [
        'thenorthsolution/Reciple',
        'thenorthsolution/prtyprnt',
        'catplvsplus/lrclib.js',
        'thenorthsolution/djs-utils',
        'FalloutStudios/fallout-utility'
    ];

    public reducedMotionQuery = new MediaQuery('(prefers-reduced-motion: reduce)', true);
    public reducedTransparencyQuery = new MediaQuery('(prefers-reduced-transparency: reduce)', true);

    public reducedMotionStore: PersistedState<boolean|0> = new PersistedState('reduced-motion', 0, { storage: 'local', syncTabs: true });
    public reducedTransparencyStore: PersistedState<boolean|0> = new PersistedState('transparency', 0, { storage: 'local', syncTabs: true });
    public enableConfettiStore: PersistedState<boolean|0> = new PersistedState('enable-confetti', 0, { storage: 'local', syncTabs: true });
    public songIdStore: PersistedState<SongOfTheDay> = new PersistedState('song-id', {
        id: Variables.getRandomSongId()!,
        savedAt: Date.now()
    }, { storage: 'local', syncTabs: true });

    public songsRecommendedStore: PersistedState<string[]> = new PersistedState('songs-recommended', [], { storage: 'local', syncTabs: true });

    public user: IGithubUser|null = $state(null);
    public repositories: IGithubRepo[]|null = $state(null);
    public busy: boolean = $state(false);
    public isMobile: boolean = $state(isMobile());
    public reducedMotion: boolean = $derived(this.reducedMotionStore.current !== 0 ? this.reducedMotionStore.current : this.reducedMotionQuery.current);
    public transparency: boolean = $derived(this.reducedTransparencyStore.current !== 0 ? !this.reducedTransparencyStore.current : !this.reducedTransparencyQuery.current);
    public enableConfetti: boolean = $derived(this.reducedMotion ? false : (this.enableConfettiStore.current !== 0 ? this.enableConfettiStore.current : true));
    public songId: string = $derived(this.songIdStore.current.id);

    public async fetch(): Promise<void> {
        this.busy = true;

        await Promise.all([
            this.fetchUserData(),
            this.fetchRepositories()
        ]);

        this.cycleSongOfTheDay();
        this.busy = false;
    }

    public refreshSongId(): SongOfTheDay {
        const excludeIds = this.songsRecommendedStore.current;

        let id = Variables.getRandomSongId([this.songId, ...excludeIds]);

        if (!id) {
            this.songsRecommendedStore.current = [];
            return this.refreshSongId();
        }

        this.songsRecommendedStore.current.push(id);

        return this.songIdStore.current = {
            id: id!,
            savedAt: Date.now()
        };
    }

    public cycleSongOfTheDay(): SongOfTheDay {
        const current = this.songIdStore.current;
        const savedAt = new Date(current.savedAt);
        const hoursSinceSaved = (Date.now() - savedAt.getTime()) / 1000 / 60 / 60;

        if (hoursSinceSaved >= 24) {
            return this.refreshSongId();
        }

        return current;
    }

    public async fetchUserData(): Promise<IGithubUser|null> {
        const response: IGithubUser|null = await fetch(`https://api.github.com/users/${Variables.username}`)
            .then(async res => res.ok ? await res.json() : null)
            .catch(() => null);

        return this.user = response;
    }

    public async fetchRepositories(): Promise<IGithubRepo[]> {
        return this.repositories = (await Promise.all(Variables.repositories.map(url => Variables.fetchRepository(url)))).filter(Boolean) as IGithubRepo[];
    }

    public static async fetchRepository(url: string): Promise<IGithubRepo|null> {
        const [owner, name] = url.split('/');

        return  await fetch(`https://api.github.com/repos/${owner}/${name}`)
            .then(async res => res.ok ? await res.json() : null)
            .catch(() => null);
    }

    public static getRandomSongId(excludeIds?: string[]): string|undefined {
        const list = favoriteSongIds.filter(i => !excludeIds?.includes(i));
        return list[Math.floor(Math.random() * list.length)];
    }
}

export default new Variables();