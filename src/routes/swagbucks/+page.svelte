<script lang="ts">
	import type { PageData } from './$types';
  import { writable, derived } from 'svelte/store';
  import { flip } from 'svelte/animate';
  import { crossfade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

  const DEFAULT_DURATION = 500;
  const [send, receive] = crossfade({duration: DEFAULT_DURATION, easing: cubicOut});

	export let data: PageData;
  let games = data.games

  // Filters
  const providerFilter = writable<string>('')
  const offerFilter    = writable<number>(0)
  // const deviceFilter   = writable<string>('')
  const nameFilter     = writable<string>('')
  const tagsFilter     = writable<string[]>([])

  // Device filters
  const pcFilter       = writable<boolean>(false)
  const androidFilter  = writable<boolean>(false)
  const iosFilter      = writable<boolean>(false)
  const deviceFilter   = derived(
    [pcFilter, androidFilter, iosFilter],
    ([$pc, $android, $ios]) => {
      let devices: ('pc' | 'android' | 'ios')[] = []
      if ($pc) devices.push('pc')
      if ($android) devices.push('android')
      if ($ios) devices.push('ios')
      return devices;
    }
  )

  const displayTags   = writable<Record<string, boolean>>({})

  const filteredGames = derived(
    [providerFilter, offerFilter, deviceFilter, nameFilter, tagsFilter],
    ([$provider, $offerAmount, $devices, $name, $tag]) => {

      // Filters the game offers into the 'filtered' variable using the various provided filters
      let filtered = games.filter(game => {
        console.log(game.availableOn)
        return (
          (game.provider.includes($provider)) &&
          (game.fullOffer >= $offerAmount) &&
          ($devices.length === 0 || $devices.some(device => game.availableOn.includes(device))) &&
          (game.title.toLowerCase().includes($name.toLowerCase())) &&
          ($tag.length === 0 || $tag.every(tag => game.tags.includes(tag)))
        )
      })

      // Uses the previously fitered game offerings to filter the displayed tags
      let currentTags: Record<string, boolean> = {}
      filtered.forEach((game) => {
        game.tags.forEach((tag) => {
          if (!(tag in currentTags)) {
            if ($tagsFilter.includes(tag)) {
              currentTags[tag] = true
            } else {
              currentTags[tag] = false
            }
          }
        })
      })
      $displayTags = currentTags

      return filtered
    }
  )

  console.log(games)

  let providers: string[] = []
  let tags: Record<string, boolean> = {}

  // Generate list of tags & providers
  $filteredGames.forEach((game) => {
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



// TODO
// filters
  // Tags
    // [x] set only available based on remaining games
    // [x] transitions?
  // [ ] add device available on filter
  // [ ] link devices to filter
  // [ ] max height for tags div, scrollable
  // [ ] labels for offer total ($min, $max)
  // [ ] mobile styling
  // [ ] timeout on offer sliding?
  // [ ] set all filters based on available thing remaining
//
// Games
  // [ ] Create normal cards?
  // [x] transitions for filtered games
    // [x] game flashes to left of screen when switching providers..
      // doesn't happen when having the proper in/out for flip, can't use fade :(
  // [ ] device icons on cards
  // [ ] Flip with info on back?
  // [ ] cards flip out when nothing filtered


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
    <div class="flex flex-col md:flex-row justify-between gap-4">

      <!-- Providers, Name, Offer filters -->
      <div class="md:w-1/3">
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

        <!-- Device & Offer Filters -->
        <div class="flex">

          <!-- Device Filter -->
          <div class="w-1/3 space-y-2 my-2">
            <label for="pc" class="flex items-center space-x-2">
              <input name="pc" class="checkbox" type="checkbox" bind:checked={$pcFilter} />
              <p>PC</p>
            </label>
            <label for="android" class="flex items-center space-x-2">
              <input name="android'" class="checkbox" type="checkbox" bind:checked={$androidFilter} />
              <p>Android</p>
            </label>
            <label for="ios" class="flex items-center space-x-2">
              <input name="ios" class="checkbox" type="checkbox" bind:checked={$iosFilter} />
              <p>iOS</p>
            </label>
          </div>

          <!-- Offer Filter -->
          <div class="w-2/3 relative flex flex-col justify-center items-center">
            <div class="flex gap-4">
              <label for="sb" class="flex items-center space-x-2">
                <input class="radio" type="radio" name="currency" id="sb" value="sb" checked />
                <p>SB</p>
              </label>
              <label for="$" class="flex items-center space-x-2">
                <input class="radio" type="radio" name="currency" id="$" value="$" />
                <p>$</p>
              </label>
            </div>
            <label class="label">
              <span>Offer Total</span>
              <input class="input" type="range" bind:value={$offerFilter} step="100" max={maxOffer} />
              <span class="text-sm absolute start-0 bottom-0">0</span>
              <span class="text-sm absolute end-0 bottom-0">{maxOffer}</span>
            </label>
          </div>

        </div>

      </div>

      <!-- Tags filter -->
      <div class="md:w-2/3 py-4 h-min flex flex-wrap gap-0">
        {#each Object.keys($displayTags) as tag (tag)}
          <button class="chip h-8 m-2 {$displayTags[tag] ? 'variant-filled' : 'variant-soft'}"
            on:click={() => { toggleTag(tag) }}
            animate:flip="{{ duration: DEFAULT_DURATION }}"
          >
            {tag}
          </button>
        {/each}
      </div>

    </div>
    </section>


    <section id="gameGrid" class="max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
      <!-- {#key $filteredGames} -->

      {#each $filteredGames as game (game.title)}
      <div class="flex flex-col items-center max-w-56"
      in:receive="{{key:game.title}}"
      out:send="{{key: game.title}}"
      animate:flip="{{ duration: DEFAULT_DURATION }}"
      >
      <a href={`swagbucks/${game.slug.current}`}>
        <img class="h-auto md:w-56 max-w-full rounded-lg" src={game.image.asset.url} alt={`Thumbnail for ${game.title}`} />
      </a>
      <h3 class="h3 text-center">{game.title}</h3>
    </div>
    {/each}
    <!-- {/key} -->
  </section>

</main>