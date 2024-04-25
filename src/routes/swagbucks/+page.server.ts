import type { PageServerLoad } from './$types';

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;

import { client } from '$lib/utils/sanity/client';

export async function load({ params }) {
  const data = await client.fetch(`*[_type == "games"]`)

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