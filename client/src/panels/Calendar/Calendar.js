import React, { Component } from 'react';
import Calendar from 'react-calendar';
import "../CSS/Panels.css";
 
class CalendarPanel extends Component {
  state = {
    date: new Date(),
  };
 
  onChange = date => this.setState({ date })
 
  render() {
    const style2 = { margin: '0px', padding: '10px 0px', };
    const calendarStyles = { 
      margin: '0 0 0 0', 
      maxWidth: '100%', 
      border: 'solid rgba(83, 86, 101, 1) 2px', 
      borderRadius: '3px' };
    return (
      <div className="calendarBox">
        <h1 style={style2}>Calendar</h1>
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