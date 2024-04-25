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
      }
    }),
    defineField({
      type: 'image',
      name: 'image',
      description: 'Thumbnail of the game.',
      validation: rule => rule
        .required().assetRequired()
        .error('Must have an image to display.')
    })
  ],
});
