import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class Marketing extends Component{
    constructor(props){
        super(props);
        this.state = {
                chartDataExpenses: {
                    labels: ['Instagram', 'Google Ads', 'Twitter', 'Facebook'],
                    datasets: [{
                        data: [7499, 45000, 12980, 78500],
                        backgroundColor: ['#ff0000', '#000000', '#2f4f4f', '#ffce56']
                    }
            ]}
            }
        }
    
    render(){
        const wellStyles = { maxWidth: 400, margin: '0 auto 10px', backgroundColor: '#ffffff'};
        return (
        <div>
        <h2>Marketing Trends</h2>
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