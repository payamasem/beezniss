import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const TwitterPanel = () => (
  <div>
    <h1>Social Media</h1>
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'Bayer'
      }}
      options={{
        username: 'Bayer',
        height: '440',
      }}
    />
  </div>
)

export default TwitterPanel;