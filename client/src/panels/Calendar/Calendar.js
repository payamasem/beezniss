import React, { Component } from 'react';
import Calendar from 'react-calendar';
 
class CalendarPanel extends Component {
  state = {
    date: new Date(),
  };
 
  onChange = date => this.setState({ date })
 
  render() {
    const style2 = { margin: '-2px 0 4px 42px' };
    const calendarStyles = { margin: '0 0 0 42px', float: 'left', maxWidth: '75%', border: 'solid rgba(83, 86, 101, 1) 3px', borderRadius: '3px' };
    return (
      <div>
        <h2 style={style2}>Calendar</h2>
        <div style={calendarStyles}>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      </div>
    );
  }
};

export default CalendarPanel;