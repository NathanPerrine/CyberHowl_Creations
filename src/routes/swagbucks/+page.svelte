<script lang="ts">
	import type { PageData } from './$types';
  import { writable, derived } from 'svelte/store';

	export let data: PageData;

  let games = data.games

  console.log(games)

  let providers: string[] = []
  games.forEach((game) => {
    if (!providers.includes(game.provider)){
      providers.push(game.provider)
    }
  })

  let maxOffer: number = games.reduce((acc, value) => {
    return (acc = acc > value.fullOffer ? acc : value.fullOffer);
  }, 0)

  // Filters
  const providerFilter = writable('')
  const offerFilter    = writable(0)
  const deviceFilter   = writable('')
  const nameFilter     = writable('')

  $: console.log($offerFilter)

  const filteredGames = derived(
    [providerFilter, offerFilter, deviceFilter, nameFilter],
    ([$provider, $offerAmount, $device, $name]) => {
      return games.filter(game => {
        return (
          (game.provider.includes($provider)) &&
          (game.fullOffer >= $offerAmount) &&
          (game.title.toLowerCase().includes($name.toLowerCase()))
        )
      })
    }
  )


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
    <section>
      <!-- Providers Filter-->
      <section>
        <label class="label" for="provider">
          <span>Provider</span>
          <select class="select max-w-32" name="provider" bind:value={$providerFilter} >
            <option value="" selected>All</option>
            {#each providers as provider (provider)}
            <option value={provider}>{provider}</option>
            {/each}
          </select>
        </label>
      </section>

      <!-- Name Filter -->
      <section>
        <label class="label">
          <span>Name</span>
          <input class="input" type="text" bind:value={$nameFilter} placeholder="Name" />
        </label>
      </section>

      <!-- Offer Filter -->
      <input type="range" bind:value={$offerFilter} step="100" max={maxOffer} />

    </section>
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