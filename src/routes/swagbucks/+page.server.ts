import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';

export async function load({ params }) {
  const data = await client.fetch(`*[_type == "games"] {
    title,
    slug,
    image {
      asset -> {
        url
      }
    },
    content,
  }`)

  if (data) {
    return {
      games: data
    };
  }

  return {
    status: 500,
    body: new Error("Internal Server Error")
  };
}