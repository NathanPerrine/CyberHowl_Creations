import { defineField, defineType } from 'sanity'
import { CheckmarkIcon, CircleIcon} from '@sanity/icons'
import { MilestoneItem } from './milestoneItem'

export type Milestone = {
  _key: string
  milestone?: string
  offer?: number
  completed?: boolean
}

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
      name: 'rewardType',
      title: 'Reward Type',
      type: 'array',
      of: [{ type: 'string'}],
      options: {
        list: [
          { value: 'SB', title: 'Swagbucks'},
          { value: '$', title: 'Dollars'},
        ]
      },
      validation: rule => [
        rule
          .required()
          .error('What is the reward? Dollars ($), Swagbucks (SB), etc.'),
        rule
          .max(1)
          .error('Only select one reward type.')
      ]
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
      rewardType: 'rewardType',
      completed: 'completed',
    },

    prepare: ({milestone, reward, rewardType, completed}) => ({
      title: milestone,
      subtitle: rewardType == '$' ? `${rewardType}${reward}` : `${reward} ${rewardType}`,
      media: completed ? CheckmarkIcon : CircleIcon
    })
  },
  components: {item: MilestoneItem}
})