import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import SkyLight from 'react-skylight';
import {Button} from 'semantic-ui-react'

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
          <h5>Click-Through-Rate by Campaign</h5>
          <div className="chart">
            <Doughnut
            data={this.state.chartDataExpenses}
            width={500}
	        height={315}
	        options={{
		        maintainAspectRatio: false
	        }}
            />
            </div>
            </div>

    )
  }
}

export default Marketing;