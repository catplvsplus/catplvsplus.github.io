export interface IGithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    type: "User";
    user_view_type: string;
    site_admin: boolean;
    name: string;
    company: null|string;
    blog: string|null;
    location: string|null;
    email: string|null;
    hireable: boolean;
    bio: string;
    twitter_username: string|null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface IGithubRepo {
    name: string;
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    homepage: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string;
    archived: boolean;
    license: {
        key: string;
        name: string;
        spdx_id: string;
    };
    topics: string[];
}

export interface SongOfTheDay { id: string; savedAt: number; }

export interface SocialLink {
    name: string;
    url: string;
    icon?: any;
}

export type SettingsPropertyValue = 'enabled'|'disabled'|'auto';
export type ModeValues = 'dark'|'light'|'system';

export interface TechnicalSkill {
    label: string;
    color: string;
    icon?: any;
}