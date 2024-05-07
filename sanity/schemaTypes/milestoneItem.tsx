import { ObjectItemProps, PatchEvent, set, useFormValue } from 'sanity';
import { Box, Flex, Switch } from '@sanity/ui'
import { useDocumentPane } from 'sanity/structure';
import { useCallback } from 'react';
import { Milestone } from './milestones'

export function MilestoneItem(props: ObjectItemProps<Milestone>){
  const { value, path } = props
  const { onChange } = useDocumentPane()

  const parentPath = path.slice(0, -1)
  const allItems = useFormValue(parentPath) as Milestone[]

  const handleClick = useCallback(() => {
    const nextValue = value?.completed ? false : true
    const clickedFeaturedPath = [...path, 'completed']

    onChange(
      PatchEvent.from([
        set(nextValue, clickedFeaturedPath),
      ])
    )
  }, [value?.completed, value?._key, path, allItems, onChange, parentPath])

  return (
    <Flex gap={3} paddingRight={2} align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Switch checked={value?.completed} onClick={handleClick} />
    </Flex>
  )
}