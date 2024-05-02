import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {
  console.log(params.slug)

  const data = await client.fetch(`*[_type == "games" && slug.current == "${params.slug}"] {
    title,
    developer,
    datePlayed,
    device,
    tags,
    fullOffer,
    earned,
    image {
      asset -> {
        url
      }
    },
    content,
  }`)

  if (data) {
    return {
      game: data
    };
  }

  return {
    status: 500,
    body: new Error("Internal Server Error")
  };

    return {};
}) satisfies PageServerLoad;