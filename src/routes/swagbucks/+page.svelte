<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
  console.log(data)

	// import { client } from '$lib/utils/sanity/client';

	// // Fetch content with GROQ
	// async function getContent() {
	// 	const CONTENT_QUERY = `*[_type == "game"] {
  //   ...,
  //   content[] {
  //     _type,
  //     ...,
  //     defined(string) => string
  //   },
  //   categories[]->,
  //   coverImage {
  //     ...,
  //     asset->
  //   },
  //   gallery[] {
  //     image {
  //       ...,
  //       asset->
  //     }
  //   }
  // }
  // `;
	// 	const content = await client.fetch(CONTENT_QUERY);
	// 	return content;
	// }

	// // Log content to console
	// getContent().then((content) => console.log(content));

	// // Insert the return component calling `getContent()` below
</script>


<h1>Test</h1>