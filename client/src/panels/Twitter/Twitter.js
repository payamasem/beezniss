import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const TwitterPanel = () => (
  <Timeline
    dataSource={{
      sourceType: 'profile',
      screenName: 'Bayer'
    }}
    options={{
      username: 'Bayer',
      height: '400'
    }}
    onLoad={() => console.log('Timeline is loaded!')}
  />
)

export default TwitterPanel;