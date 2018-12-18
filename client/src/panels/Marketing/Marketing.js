import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import "../CSS/Panels.css";

class Marketing extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartDataExpenses: {
                labels: ['Instagram', 'Google Ads', 'Twitter', 'Facebook'],
                datasets: [{
                    data: [7499, 45000, 12980, 78500],
                    backgroundColor: ['hsla(69, 53%, 50%, 0.33)', 'hsla(179, 53%, 50%, 0.33)', 'hsla(258, 55%, 73%, 0.33)', 'hsla(332, 55%, 73%, 0.33)']
                }]
            }
        }
    }
    
    render(){
        const wellStyles = { 
            padding: '5px', 
            maxWidth: 400, 
            margin: '0 auto 10px', 
            backgroundColor: '#ffffff', 
            border: 'solid rgba(83, 86, 101, 1) 3px', 
            borderRadius: '4px',
            maxHeight: "100%" };       
        return (
            <div className="marketingBox">
                <h1>Marketing Trends</h1>
                <div className='well' style={wellStyles}>
                  <div className="chart">
                    <Doughnut
                        data={this.state.chartDataExpenses}
                        width={250}
            	        height={250}
            	        options={{
            		        maintainAspectRatio: false
            	        }}
                    />
                    </div>
                </div>
                <p text-align='center'>*Data based on Click-Through-Rates for each campaign</p>
            </div>
    )
  }
}

export default Marketing;