import { defineType, defineField } from 'sanity'

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
      description: 'Month the offer was started. YYYY-MM',
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
      name: 'availableOn',
      title: 'Available On',
      description: 'What platforms can this offer be completed on?',
      type: 'array',
      of: [{ type: 'string'}],
      options: {
        list: [
          { value: 'android', title: 'Android' },
          { value: 'ios', title: 'iOS' },
          { value: 'pc', title: 'PC' },
        ]
      },
      validation: rule => rule
        .required()
        .error('What platforms are available for this offer?')
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
      description: 'Game descriptions, taken from the store page if available.',
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

    defineField({
      name: 'nonReferralURL',
      title: 'Non-referral URL',
      type: 'url',
      validation: rule => rule
        .required()
        .error('Please add the URL to the offer page.')
    }),

    defineField({
      name: 'referralURL',
      title: 'Referral URL',
      type: 'url',
    }),
  ],
});
