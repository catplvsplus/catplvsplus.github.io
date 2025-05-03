import type Parallax from 'parallax-js';
import type { SocialLink } from '$lib/helpers/types';
import { SiBluesky, SiDiscord, SiGithub, SiInstagram, SiSpotify, SiTiktok } from '@icons-pack/svelte-simple-icons';

export const parallaxOptions: Parallax.ParallaxOptions = {
    calibrateX: false,
    calibrateY: true,
    invertX: true,
    invertY: true,
    limitX: false,
    limitY: false,
    scalarX: 10.0,
    scalarY: 10.0,
    frictionX: 0.1,
    frictionY: 0.1
};

export const socialLinks: SocialLink[] = [
    {
        name: "Github",
        url: "https://github.com/catplvsplus",
        icon: SiGithub
    },
    {
        name: "Discord",
        url: "https://discord.com/users/923444378951905340",
        icon: SiDiscord
    },
    {
        name: "Instagram",
        url: "https://instagram.com/catplvsplus",
        icon: SiInstagram
    },
    {
        name: "Bluesky",
        url: "https://bsky.app/profile/barbie.beyhive.social",
        icon: SiBluesky
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@nxzz_vn",
        icon: SiTiktok
    },
    {
        name: "Spotify",
        url: "https://open.spotify.com/user/31o67p6spk3qfxqsar6gmcszglqi?si=075b4fc19a0e4b74",
        icon: SiSpotify
    }
];

export const favoriteSongIds: string[] = [
    '1dAKL41zeVDP8PiLJDsRQv',
    '0nyjSQaOraSpDDnadBJU49',
    '2DPq5UkMuc7eN2NFHjGPNn',
    '5elW2CKSoqjYoJ32AGDxf1',
    '3RkSwrsIadAvqVtMp5yhaB',
    '44hqFxUWsADWewEJELnncj',
    '21aOLk12MksET8AsbU0SI6',
    '7mpdNiaQvygj2rHoxkzMfa',
    '6tuTpe37ljVcrJeZAAKBE1',
    '3gYWGRS64XrGSrjD3vvtga',
    '3aAnwyBJY9OLNLqSgd4fZU',
    '1Z8TPHiKeCUyClxV6WTTIf',
    '5Cb3JSisvjlZhjSfYD6d7C',
    '4NxbUHGeXsQgxvR8YKbHjC',
    '0UzymivvUH5s8z4PeWZJaK',
    '3YNjvUXgfQznx5IZHAXk6i',
    '6i1PYoUEMHqxAsAUKHkqpe',
    '1j3H5bMaTPwFFuXoUydeFG',
    '2nfluhFVrO5OBXPzRWlwlz',
    '3FAmnX3nUGsue2TcNEnq0t',
    '1o844wI52S3TjXGBwvGcc7',
    '6SaSFVlIQC1L6Fh1QKLeFi',
    '4lwTKer57RtonkWsEi2pVn',
    '6uPnrBgweGOcwjFL4ItAvV',
    '4mUR5Tv0CvJtpmnUtzeIgd',

    '1UPB5rYJ0bzn6mNSoAHrZC',
    '4x2PkqSLtuwv53hLqq4GiY',
    '21acb66djKRlDPJOXRBCkc',
    '0XZW4ZKXOwo9kCyDpXGNc7',
    '68HocO7fx9z0MgDU0ZPHro',

    '3WSOUb3U7tqURbBSgZTrZX',
    '5KtvumPgVZmt8wg9xONE0T',
    '4ROYC4vHfPZ28mqz0eLrzL',
    '1k2pQc5i348DCHwbn5KTdc',
    '0WbMK4wrZ1wFSty9F7FCgu',

    '7bPWdJgx8vek7S5i5yAtvG',
    '4qG7hWhljsqqENL5PaLA2z',
    '1RPsOAaHaRu8JlVdeaciuL',
    '6pZ9Nj3vzj1RW4ZkR9GcQ9',
    '5gDWsRxpJ2lZAffh5p7K0w',
    '142PiXzA84lmEw2RstFHFa',
    '0FFsgUoFibYISzMxuGS61W',
    '0WdR2AyLW1Drd3OUdwezM0',
    '6XXKB32Om6WuXg3uEWwTob',
    '0owMmMqkYKJ4g6UcaH5Pho',
    '7IL8PSVwLOJxqYne6azxQv',
    '5J4ZkQpzMUFojo1CtAZYpn',
    '4Ouhoi2lAhrLJKFzUqEzwl',
    '2nMeu6UenVvwUktBCpLMK9',

    '1UrwJzlNC2oaTlxj1OZmcu',
    '1Q7EgiMOuwDcB0PJC6AzON',
    '2262bWmqomIaJXwCRHr13j',
    '3QaPy1KgI7nu9FJEQUgn6h',
    '2JN3ugW1cEahbYw0I5mw5U',
    '5TTGoX70AFrTvuEtqHK37S',
    '0iO2iCAjtX0t5duvczNQt6',
    '3qhlB30KknSejmIvZZLjOD',
    '6wZOZ0votPhc8qdg4UFPtH',
    '5SmXEPnevlRjBPWBG7oKIi',
    '1By0EoZgkP7shwWfokVzfW',
    '7CyPwkp0oE8Ro9Dd5CUDjW',
    '4mDLApzbhjNSutiW2EOakg',

    '5wANPM4fQCJwkGd4rN57mH',
    '4ZtFanR9U6ndgddUvNcjcG',
    '2tGvwE8GcFKwNdAXMnlbfl',
    '17cia5k4BpGVlyEfqrFH50',
    '6MzofobZt2dm0Kf1hTThFz',
    '1dGsmX6TryxdBHfBzzZ1eK',
    '6HU7h9RYOaPRFeh0R3UeAr',
    '5CZ40GBx1sQ9agT82CLQCT',

    '06IkOr83qPqa3yYvrIjgxp',
    '4cBm8rv2B5BJWU2pDaHVbF',
    '2xCkiGqGMkAIg6fQTag51C',
    '7b89Ffklm3xh4GI37vlZDZ',
    '2Dhdu4YB3y5U3RiIcCJduv',
    '2nqlM3gNBMi5Zf9MDzp2Xi',
];