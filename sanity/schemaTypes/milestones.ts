import { defineField, defineType } from 'sanity'
import { BookIcon} from '@sanity/icons'

export const milestonesType = defineType({
  name: 'milestones',
  title: 'Milestones',
  type: 'object',
  fields: [
    defineField({
      name: 'milestone',
      title: 'Milestone',
      type: 'string'
    }),
    defineField({
      name: 'completed',
      type: 'boolean',
      initialValue: false,
    })
  ]
})