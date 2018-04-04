import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const TwitterPanel = () => (
  <div>
  <h2>Social Media</h2>
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
  </div>
)

export default TwitterPanel;