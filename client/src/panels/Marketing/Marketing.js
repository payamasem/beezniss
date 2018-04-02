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
                        backgroundColor: ['#ff6384', '#ffce56', '#cc65fe', '#36a2eb']
                    }
            ]}
            }
        }
    
    render(){
        return (
        <div>
          <h2>Marketing Trends</h2>
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
            <p>*Data based on Click-Through-Rates for each campaign</p>
            </div>

    )
  }
}

export default Marketing;