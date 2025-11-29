<script>
    import { Separator } from '$lib/components/ui/select/index.js';
    import Variables, { Variables as V } from '$lib/helpers/variables.svelte.js';
    import { BookMarked, Circle, Scale, Star } from '@lucide/svelte';
    import { findLanguageColor } from '$lib/helpers/utils.js';
    import { Skeleton } from '$lib/components/ui/skeleton/index.js';
    import { lighten, transparentize } from 'color2k';
    import { mode } from 'mode-watcher';
    import { Badge } from '$lib/components/ui/badge/index.js';
</script>

<div id="projects" class="flex justify-center items-center px-5 pb-5">
    <div class="w-full sm:max-w-2xl max-w-96">
        <h2 class="flex items-center gap-3 sm:mt-8 my-5 sm:text-2xl text-xl font-bold font-special-gothic-expanded-one tracking-wider">
            <Separator class="mt-2 w-1/2 h-0.5 rounded-full shrink bg-border"/>
            <span class="shrink-0">My <span class="text-primary">Projects</span></span>
            <Separator class="mt-2 w-1/2 h-0.5 rounded-full shrink bg-border"/>
        </h2>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-2">
            {#if Variables.repositories?.length}
                {#each Variables.repositories as repository}
                    {@const color = findLanguageColor(repository.language)}
                    {@const foreground = color && (mode.current !== 'dark' ? color : lighten(color, 0.1))}
                    {@const background = color && transparentize(color, 0.9)}
                    <div class="sm:w-full w-full flex flex-col p-5 bg-border/80 border shadow-sm rounded-2xl">
                        <h3 class="font-special-gothic-expanded-one text-lg flex items-center gap-1.5">
                            <BookMarked class="size-[1.2rem]" strokeWidth={2.5}/>
                            <a href={repository.html_url} class="hover:text-primary focus:text-primary" target="_blank" rel="noopener noreferrer">
                                {repository.name}
                            </a>
                        </h3>
                        <div class="flex flex-wrap relative items-center gap-1 mt-1 mb-2 text-sm font-bold text-nowrap">
                            <Badge>
                                <a href={repository.html_url} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 font-bold">
                                    <Star fill="currentColor" class="size-4"/>
                                    <span>{repository.stargazers_count ? repository.stargazers_count.toLocaleString() : 'Add a star'}</span>
                                </a>
                            </Badge>
                            {#if repository.license}
                                <Badge variant="secondary" class="flex !bg-primary/10 text-primary items-center gap-1 font-bold">
                                    <Scale class="size-4"/>
                                    <span>{repository.license.spdx_id}</span>
                                </Badge>
                            {/if}
                            <Badge class="flex items-center gap-1 font-bold" style="background-color: {background}; color: {foreground};">
                                <Circle class="size-3" fill="currentColor"/>
                                <span>{repository.language}</span>
                            </Badge>
                        </div>
                        <p class="text-muted-foreground whitespace-break-spaces break-word h-full">{repository.description}</p>
                        <div class="flex flex-wrap gap-1 mt-3">
                            {#each (repository.topics ?? []).toSpliced(3) as topic}
                                <Badge variant="secondary" class="hover:text-primary focus:text-primary bg-foreground/10 hover:bg-primary/10">
                                    <a href="https://github.com/topics/{topic}" title={topic} target="_blank" rel="noopener noreferrer">
                                        {topic}
                                    </a>
                                </Badge>
                            {/each}
                            {#if repository.topics?.length > 3}
                                <Badge variant="secondary" class="hover:text-primary focus:text-primary bg-foreground/10 hover:bg-primary/10">
                                    <a href={repository.html_url} title="{repository.topics.length - 3} more" target="_blank" rel="noopener noreferrer">
                                        +{repository.topics.length - 3}
                                    </a>
                                </Badge>
                            {/if}
                        </div>
                    </div>
                {/each}
            {:else}
                {#each V.repositories as _}
                    <div class="sm:w-full w-full flex flex-col gap-2 p-5 bg-border/80 border shadow-sm rounded-2xl">
                        <Skeleton class="h-6 rounded-full w-52"/>
                        <div class="flex flex-col gap-1 w-full">
                            <Skeleton class="h-4 rounded-full max-w-full"/>
                            <Skeleton class="h-4 rounded-full w-2/3 max-w-full"/>
                            <Skeleton class="h-4 rounded-full w-1/4 max-w-full"/>
                        </div>
                        <div class="flex relative items-center gap-3 mt-2 text-sm font-bold">
                            <Skeleton class="h-4 rounded-full w-1/3 max-w-full"/>
                            <Skeleton class="h-4 rounded-full w-1/3 max-w-full"/>
                            <Skeleton class="h-4 rounded-full w-1/3 max-w-full"/>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>