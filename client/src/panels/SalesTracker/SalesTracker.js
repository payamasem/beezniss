import React, {Component} from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import SkyLight from 'react-skylight';
import {Button, Icon} from 'semantic-ui-react';

class SalesTracker extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: {
                labels: ['Chocolate Chip', 'Oatmeal Raisin', 'Snickerdoodle', 'Peanut Butter'],
                datasets: [{
                    label: 'Q1',
                    data: [65499, 62898, 69400, 65899],
                    backgroundColor: '#ff6384'
                }, {
                    label: 'Q2',
                    data: [64600, 64800, 63900, 65450],
                    backgroundColor: '#ffce56'
                },{
                    label: 'Q3',
                    data: [64600, 64800, 73900, 64450],
                    backgroundColor: '#cc65fe'
                },{
                    label: 'Q4',
                    data: [64600, 64800, 73900, 64450],
                    backgroundColor: '#36a2eb'
                }]

            },
            chartDataQuarterly: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Cookie Division',
                    data: [65499, 62898, 69400, 65899],
                    backgroundColor: '#ff6384'
                }, {
                    label: 'Electric Motors Division',
                    data: [64600, 64800, 63900, 65450],
                    backgroundColor: '#ffce56'
                },{
                    label: 'Mitochondrial RNA Research Division',
                    data: [64600, 64800, 73900, 64450],
                    backgroundColor: '#cc65fe'
                }, 
                ]},
                chartDataAnnual: {
                    labels: ['Cookie Division', 'Electric Motors Division', 'Mitochondrial RNA Research Division'],
                    datasets: [{
                        data: [65499, 45000, 32980],
                        backgroundColor: ['#ff6384', '#ffce56', '#cc65fe']
                    }
            ]}
        }
    }
    

    render(){
        const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
        return (
        <div>
        <section>
        <div className="well" style={wellStyles}>
            <h2>Sales Forecasts</h2>
            <p>Please select the type of forecast you'd like to generate:</p>
        <Button.Group vertical>
          <Button color='yellow' icon='bar chart' content='Quarterly Sales: Cookie Division' onClick={() => this.animated.show()} />
          <Button color='black' icon='bar chart' content='Quarterly Sales: All Divisions' onClick={() => this.animatedquarterly.show()} />
          <Button color='yellow' icon='pie chart' content='Annual Sales: All Divisions' onClick={() => this.animatedannual.show()} />
        </Button.Group>
        </div>
        </section>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animated = ref} 
          title="Quarterly Sales: Cookie Division"
          transitionDuration={500} 
        >
          <div className="chart">
            <Bar
            data={this.state.chartData}
            width={500}
	        height={300}
	        options={{
		        maintainAspectRatio: false
	        }}
            />
            </div>
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedquarterly = ref} 
          title="Quarterly Sales: All Divisions"
          transitionDuration={500} 
        >
          <div className="chart">
            <Bar
            data={this.state.chartDataQuarterly}
            width={500}
	        height={320}
	        options={{
		        maintainAspectRatio: false
	        }}
            />
            </div>
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedannual = ref} 
          title="Annual Sales: All Divisions"
          transitionDuration={500} 
        >
          <div className="chart">
            <Pie
            data={this.state.chartDataAnnual}
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

export default SalesTracker;