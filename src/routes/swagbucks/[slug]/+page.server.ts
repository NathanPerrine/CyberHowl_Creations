import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { client } from '$lib/utils/sanity/client';
import { z } from 'zod';

const MilestoneItem = z.object({
  _key: z.string(),
  reward: z.number(),
  milestone: z.string(),
  rewardType: z.array(z.enum(['SB', '$'])),
  _type: z.string(),
  completed: z.boolean()
}).transform((milestone) => ({
  ...milestone,
  rewardType: milestone.rewardType[0],
}))

const ImageZObj = z.object({
  asset: z.object( {url: z.string() })
})

const ContentChild = z.object({
  _type: z.string(),
  marks: z.array(z.string()).default([]),
  text: z.string(),
  _key: z.string(),
})

const ContentObj = z.object({
  _type: z.string(),
  style: z.string(),
  markDefs: z.array(z.string()).default([]),
  _key: z.string(),
  children: z.array(ContentChild)
})

const GameResult = z.object({
  title: z.string(),
  developer: z.string(),
  provider: z.string(),
  datePlayed: z.string().date(),
  device: z.string(),
  availableOn: z.array(z.enum(['android', 'ios', 'pc'])),
  tags: z.array(z.string()),
  fullOffer: z.number(),
  earned: z.number(),
  milestoneList: z.array(MilestoneItem),
  image: ImageZObj,
  content: z.array(ContentObj),
  nonReferralURL: z.string().url(),
  referralURL: z.string().url(),
})

const GameData = z.array(GameResult)

export const load = (async ({ params }) => {

  const data = await client.fetch(`*[_type == "games" && slug.current == "${params.slug}"] {
    title,
    developer,
    provider,
    datePlayed,
    device,
    availableOn,
    tags,
    fullOffer,
    earned,
    milestoneList,
    image {
      asset -> {
        url
      }
    },
    content,
    nonReferralURL,
    referralURL,
  }`)

  if (!data[0]){
    error(404, {
      message: 'Game Not Found'
    })
  }

  const parsedData = GameResult.parse(data[0])
  return {
    game: parsedData
  };
}) satisfies PageServerLoad;