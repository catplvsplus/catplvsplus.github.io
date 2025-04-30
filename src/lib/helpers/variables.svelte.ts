import { MediaQuery } from 'svelte/reactivity';
import type { IGithubRepo, IGithubUser } from './types';
import { PersistedState } from 'runed';
import isMobile from 'is-mobile';

export class Variables {
    public static username: string = 'catplvsplus';
    public static repositories: string[] = [
        'thenorthsolution/Reciple',
        'thenorthsolution/prtyprnt',
        'catplvsplus/lrclib.js',
        'thenorthsolution/djs-utils',
        'FalloutStudios/fallout-utility',
    ];

    public query = new MediaQuery('(prefers-reduced-motion: reduce)', true);
    public transparencyStore: PersistedState<boolean|null> = new PersistedState('transparency', null, { storage: 'local', syncTabs: true });

    public user: IGithubUser|null = $state(null);
    public repositories: IGithubRepo[]|null = $state(null);
    public busy: boolean = $state(false);
    public isMobile: boolean = $state(isMobile());
    public reducedMotion: boolean = $derived(this.query.current);
    public transparency: boolean|null = $derived(this.transparencyStore.current ?? !this.isMobile);

    public async fetch(): Promise<void> {
        this.busy = true;
        await Promise.all([this.fetchUserData(), this.fetchRepositories()]);
        this.busy = false;

        console.log($state.snapshot(this.user));
        console.log($state.snapshot(this.repositories));
    }

    public setTransparency(value: boolean): void {
        this.transparencyStore.current = value;
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

        const response = await fetch(`https://api.github.com/repos/${owner}/${name}`)
            .then(async res => res.ok ? await res.json() : null)
            .catch(() => null);

        return response;
    }

    public static minifyRepositoryObject(data: IGithubRepo): IGithubRepo {
        return {
            name: data.name,
            full_name: data.full_name,
            owner: {
                login: data.owner.login,
                avatar_url: data.owner.avatar_url,
                html_url: data.owner.html_url,
            },
            html_url: data.html_url,
            description: data.description,
            created_at: data.created_at,
            updated_at: data.updated_at,
            homepage: data.homepage,
            stargazers_count: data.stargazers_count,
            watchers_count: data.watchers_count,
            language: data.language,
            archived: data.archived,
            license: {
                key: data.license.key,
                name: data.license.name,
                spdx_id: data.license.spdx_id,
            }
        };
    }
}

export default new Variables();