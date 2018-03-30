import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import SkyLight from 'react-skylight';
import {Button} from 'semantic-ui-react'

class Marketing extends Component{
    constructor(props){
        super(props);
        this.state = {
                chartDataExpenses: {
                    labels: ['Instagram', 'Google Ads', 'Twitter', 'Billboards'],
                    datasets: [{
                        data: [7499, 45000, 12980, 78500],
                        backgroundColor: ['#ff6384', '#ffce56', '#cc65fe', '#36a2eb']
                    }
            ]}, chartDataClicks: {
                labels: ['Instagram', 'Google Ads', 'Twitter', 'Billboards'],
                datasets: [{
                    data: [79499, 65000, 14980, 7500],
                    backgroundColor: ['#ff6384', '#ffce56', '#cc65fe', '#36a2eb']
                }]
            }
        }
    }
    
    render(){
        const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
        return (
        <div>
        <section>
        <div className="well" style={wellStyles}>
            <h2>Marketing Trends</h2>
            <p>Please select the type of chart you'd like to generate:</p>
        <Button.Group vertical>
          <Button fluid color='yellow' icon='pie chart' content='Marketing Expenses: All Campaigns' onClick={() => this.animatedexpenses.show()} />
          <Button fluid color='black' icon='pie chart' content='Marketing Click-Through-Rate: All Campaigns' onClick={() => this.animatedclicks.show()} />
        </Button.Group>
        </div>
        </section>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedexpenses = ref} 
          title="Marketing Expenses: All Campaigns"
          transitionDuration={500} 
        >
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
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedclicks = ref} 
          title="Marketing Click-Through-Rate: All Campaigns"
          transitionDuration={500} 
        >
          <div className="chart">
            <Doughnut
            data={this.state.chartDataClicks}
            width={500}
	        height={315}
	        options={{
		        maintainAspectRatio: false
	        }}
            />
            </div>
        </SkyLight>
      </div>
    )
  }
}

export default Marketing;