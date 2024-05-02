<script lang="ts">
    import type { PageData } from './$types';
    import { PortableText } from '@portabletext/svelte';

    export let data: PageData;
    let game = data.game[0]

    console.log(game)
</script>

<h1>{game.title}</h1>

<PortableText value={game.content} components={{}} />