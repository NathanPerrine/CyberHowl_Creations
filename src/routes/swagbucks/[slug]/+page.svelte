<script lang="ts">
    import type { PageData } from './$types';
    import { PortableText } from '@portabletext/svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton'

    export let data: PageData;
    let game = data.game[0]
    // game.title
    // game.content
    // game.datePlayed
    // game.developer
    // game.device
    // game.earned
    // game.fullOffer
    // game.tags

    console.log(game)
</script>

<svelte:head>
  <!-- <meta name={game.title} /> -->
</svelte:head>


<main class="w-full flex flex-col items-center justify-center mt-8">

  <!-- Image and Game Info section -->
  <section class="w-full max-w-5xl flex flex-col md:flex-row justify-center items-center">
    <!-- Image -->
    <section class="m-4">
      <img src={game.image.asset.url} alt={game.title} class="rounded-lg max-w-56" />
    </section>
    <!-- Game Info section -->
    <section class="m-4 flex flex-row md:flex-col">
      <!-- Title, Dev, Offer section -->
      <section>
        <!-- Title -->
        <h1 class="h1">{game.title}</h1>
        <!-- Developer -->
        <h3 class="h3">{game.developer}</h3>
        <!-- Offer -->
        <section>
          <p>{game.earned} / {game.fullOffer}</p>
          <ProgressBar meter="bg-primary-500" track="bg-primary-500/30" value={game.earned} max={game.fullOffer} />
        </section>
      </section>
      <!-- Tags -->
      <section class="py-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        {#each game.tags as tag}
          <span class="chip variant-filled-primary">{tag}</span>
        {/each}
      </section>
    </section>
  </section>


  <section class="w-full max-w-5xl">
    <PortableText value={game.content} components={{
      block: {
        // h1: ,
      }
    }} />
  </section>


</main>


