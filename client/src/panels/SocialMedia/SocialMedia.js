import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Twitter', render: () => <Tab.Pane loading>Twitter Content</Tab.Pane> },
  { menuItem: 'Instagram', render: () => <Tab.Pane loading>Instagram Content</Tab.Pane> },
  { menuItem: 'Google News', render: () => <Tab.Pane loading>Google News Content</Tab.Pane> },
]

const SocialMedia = () => (
  <Tab panes={panes} />
)

export default SocialMedia;