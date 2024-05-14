import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

const ImageZObj = z.object({
  asset: z.object({ url: z.string() })
})

const Slug = z.object({
  current: z.string()
})

const GamesResult = z.object({
  title: z.string(),
  slug: Slug,
  image: ImageZObj,
  provider: z.string(),
  tags: z.array(z.string()),
  fullOffer: z.number(),
})

const GamesResults = z.array(GamesResult)


export const load = (async ({ params }) => {

  const data = await client.fetch(`*[_type == "games"] {
    title,
    slug,
    image {
      asset -> {
        url
      }
    },
    provider,
    tags,
    fullOffer,
  }`)

  if (!data[0]) {
    error(404, {
      message: "Something went wrong :("
    })
  }

  const parsedData = GamesResults.parse(data)

  return {
    games: parsedData
  }
}) satisfies PageServerLoad;