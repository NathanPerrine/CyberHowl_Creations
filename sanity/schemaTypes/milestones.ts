import { defineField, defineType } from 'sanity'
import { CheckmarkIcon, CircleIcon} from '@sanity/icons'

export const milestoneType = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'object',
  fields: [
    defineField({
      name: 'milestone',
      title: 'Milestone',
      type: 'string',
      validation: rule => rule
        .required()
        .error('What is the requirement for this milestone? e.g. Install, Reach level x.')
    }),
    defineField({
      name: 'reward',
      title: 'Reward',
      description: 'Reward offered',
      type: 'number',
      validation: rule => rule
        .required()
        .error('What is the reward for completing this milestone?')
    }),
    defineField({
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
      initialValue: false,
    })
  ],
  preview: {
    select: {
      milestone: 'milestone',
      reward: 'reward',
      completed: 'completed',
    },
    prepare: ({milestone, reward, completed}) => ({
      title: milestone,
      subtitle: reward,
      media: completed ? CheckmarkIcon : CircleIcon
    })
  }
})