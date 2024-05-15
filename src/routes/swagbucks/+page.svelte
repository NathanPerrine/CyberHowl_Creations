<script lang="ts">
	import type { PageData } from './$types';
  import { writable, derived } from 'svelte/store';

	export let data: PageData;
  let games = data.games

  console.log(games)

  let providers: string[] = []
  let tags: Record<string, boolean> = {}

  // Generate list of tags & providers
  games.forEach((game) => {
    if (!providers.includes(game.provider)){
      providers.push(game.provider)
    }
    game.tags.forEach((tag) => {
      if (!(tag in tags)) {
        tags[tag] = false
      }
    })
  })

  function toggleTag(tag: string): void {
    tags[tag] = !tags[tag]
    if ($tagsFilter.includes(tag)) {
      const index = $tagsFilter.indexOf(tag)
      $tagsFilter.splice(index, 1)
      $tagsFilter = $tagsFilter
    } else {
      $tagsFilter = [...$tagsFilter, tag]
    }
  }

  let maxOffer: number = games.reduce((acc, value) => {
    return (acc = acc > value.fullOffer ? acc : value.fullOffer);
  }, 0)

  // Filters
  const providerFilter = writable<string>('')
  const offerFilter    = writable<number>(0)
  const deviceFilter   = writable<string>('')
  const nameFilter     = writable<string>('')
  const tagsFilter     = writable<string[]>([])

  const filteredGames = derived(
    [providerFilter, offerFilter, deviceFilter, nameFilter, tagsFilter],
    ([$provider, $offerAmount, $device, $name, $tag]) => {
      return games.filter(game => {
        return (
          (game.provider.includes($provider)) &&
          (game.fullOffer >= $offerAmount) &&
          (game.title.toLowerCase().includes($name.toLowerCase())) &&
          ($tag.length === 0 || $tag.some(tag => game.tags.includes(tag)))
        )
      })
    }
  )

// TODO
// filters
  // Tags
    // set only available based on remaining games
    // transitions?
  // add device available on filter
  // max height for tags div, scrollable
  // labels for offer total ($min, $max)
  // mobile styling
//
// Games
  // Create normal cards?
  // transitions for filtered games
  // device icons on cards
  // Flip with info on back?


</script>


<h1 class="h1">Test h1</h1>
<h2 class="h2">Test h2</h2>
<h3 class="h3">Test h3</h3>
<h4 class="h4">Test h4</h4>
<h5 class="h5">Test h5</h5>
<h6 class="h6">Test h6</h6>


<main class="flex flex-col justify-center p-4 items-center">

  <section id="filters" class="max-w-7xl w-full py-4">
    <!-- Filter Title -->
    <h4 class="h4 text-center">Filters</h4>

    <!-- Filters -->
    <div class="flex justify-between gap-4">

      <!-- Providers, Name, Offer filters -->
      <div class="w-1/2">
        <!-- Providers Filter-->
        <div>
          <label class="label" for="provider">
            <span class="block">Provider</span>
            <select class="select" name="provider" bind:value={$providerFilter} >
              <option value="" selected>All</option>
              {#each providers as provider (provider)}
              <option value={provider}>{provider}</option>
              {/each}
            </select>
          </label>
        </div>

        <!-- Name Filter -->
        <div>
          <label class="label">
            <span>Name</span>
            <input class="input" type="text" bind:value={$nameFilter} placeholder="Name" />
          </label>
        </div>

        <!-- Offer Filter -->
        <div>
          <label class="label">
            <span>Offer Total</span>
            <input class="input" type="range" bind:value={$offerFilter} step="100" max={maxOffer} />
          </label>
        </div>
      </div>
      <!-- Tags filter -->
      <div class="w-1/2 flex flex-wrap">
        {#each Object.keys(tags) as tag}
          <button class="chip h-8 m-2 {tags[tag] ? 'variant-filled' : 'variant-soft'}"
            on:click={() => { toggleTag(tag) }}
          >
            {tag}
          </button>
        {/each}
      </div>


    </div>
    </section>


    <section id="gameGrid" class="max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each $filteredGames as game (game.title)}
      <div class="flex flex-col items-center max-w-56">
        <!-- <a href={game.slug.current}> -->
          <a href={`swagbucks/${game.slug.current}`}>
            <img class="h-auto md:w-56 max-w-full rounded-lg" src={game.image.asset.url} alt={`Thumbnail for ${game.title}`} />
      </a>
      <h3 class="h3 text-center">{game.title}</h3>
    </div>
    {/each}
  </section>

</main>