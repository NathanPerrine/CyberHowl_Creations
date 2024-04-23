import { defineType, defineField, defineArrayMember } from 'sanity'

export const game = defineType({
  type: "document",
  name: "game",
  fields: [
    defineField({ type: "string", name: "title" }),
    defineField({ type: "slug", name: "slug", options: { source: "title" } }),
    defineField({ type: "text", name: "description" }),
    defineField({
      type: "array",
      name: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          fields: [{ type: "string", name: "caption" }],
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({ type: "date", name: "releaseDate" }),
    defineField({ type: "string", name: "developer" }),
    defineField({ type: "string", name: "publisher" }),
    defineField({
      type: "array",
      name: "categories",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
    }),
    defineField({ type: "number", name: "rating" }),
    defineField({
      type: "image",
      name: "coverImage",
      options: { hotspot: true },
    }),
    defineField({
      type: "array",
      name: "gallery",
      of: [
        defineArrayMember({
          type: "image",
          fields: [{ type: "string", name: "caption" }],
          options: { hotspot: true },
        }),
      ],
    }),
  ],
});

