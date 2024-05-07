import { defineType, defineField, defineArrayMember } from 'sanity'
import { Milestone } from './milestones'

export const games = defineType({
  name: 'games',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the game',
      validation: rule => rule
        .required()
        .error('Name of game is required.')
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      },
      validation: rule => rule
        .required()
        .error('Must generate a slug for navigation.')
    }),

    defineField({
      name: 'developer',
      title: 'Developer',
      type: 'string',
      description: 'Game Developer',
    }),

    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      validation: rule => rule
      .required()
      .error('Please enter the provider this offer was completed through. Swagbucks, Freecash, etc. ')
    }),

    defineField({
      name: 'datePlayed',
      title: 'Date Played',
      type: 'date',
      description: 'Month the offer was started',
      options: {
        dateFormat: 'YYYY-MM'
      }
    }),

    defineField({
      name: 'device',
      title: 'Device',
      type: 'string',
      description: 'Type of device this offer was played on. Android, PC, iPhone, iPad',
      validation: rule => rule
        .required()
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Thumbnail of the game.',
      validation: rule => rule
        .required().assetRequired()
        .error('Must have an image to display.')
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Game descriptions',
      type:'array',
      of: [
        {
          name:'tag',
          title:'Tag',
          type:'string'
        }
      ],
      options: {
        layout: 'tags'
      },
      validation: rule => rule
        .unique()
    }),

    defineField({
      name: 'fullOffer',
      title: 'Full Offer',
      description: 'Total SB offered',
      type: 'number',
      validation: rule => rule
        .required()
        .error('Please enter the full amount offered through Swagbucks')
    }),

    defineField({
      name: 'earned',
      title: 'Total SB Earned',
      description: 'Total SB earned',
      type: 'number',
      validation: rule => rule
        .required()
        .error('Please enter the full amount of Swagbucks earned.')
    }),

    defineField({
      name: 'milestoneList',
      title: 'Milestone list',
      description: 'Various milestones for earning SB, e.g. Install, Reach level x',
      type: 'array',
      of: [{type: 'milestone'}],
      validation: rule => rule
        .required()
        .error('Please enter at least one milestone.')
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
      ]
    }),
  ],
});
