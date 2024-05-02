import { defineType, defineField, defineArrayMember } from 'sanity'

export const games = defineType({
  type: 'document',
  name: 'games',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      description: 'Name of the game',
      validation: rule => rule
        .required()
        .error('Name of game is required.')
    }),

    defineField({
      type: 'slug',
      name: 'slug',
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
      type: 'string',
      name: 'developer',
      description: 'Game Developer',
    }),

    defineField({
      type: 'date',
      name: 'datePlayed',
      title: 'Date Played',
      description: 'Month the offer was started',
      options: {
        dateFormat: 'YYYY-MM'
      }
    }),

    defineField({
      type: 'string',
      name: 'device',
      description: 'Type of device this offer was played on. Android, PC, iPhone, iPad',
      validation: rule => rule
        .required()
    }),

    defineField({
      type: 'image',
      name: 'image',
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
      name: 'milestones',
      title: 'Milestones',
      description: 'Various milestones for earning SB, e.g. Install, Reach level x',
      type: 'array',
      of: [

      ]
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
