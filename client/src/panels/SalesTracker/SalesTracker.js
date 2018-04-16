import React, {Component} from 'react';
import {Bar, Pie, Line} from 'react-chartjs-2';
import SkyLight from 'react-skylight';
import API from '../../utils/API';
import {Button, Icon} from 'semantic-ui-react';
import "../TaskManager/TaskManager.css";

class SalesTracker extends Component{
    constructor(props){
        super(props);
        this.state = {

            cookieQuarterly: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: []
            },
            motorQuarterly: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: []
            },
            rnaQuarterly: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: []

            },
            chartDataQuarterly: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Cookie Division',
                    data: [61600, 64800, 63900, 70450],
                    backgroundColor: 'hsla(69, 53%, 50%, 0.21)'
                 }, {

                    label: 'Electric Motors Division',
                    data: [64600, 64800, 63900, 65450],
                    backgroundColor: 'hsla(69, 53%, 50%, 0.21)'
                },{
                    label: 'Mitochondrial RNA Research Division',
                    data: [64600, 64800, 73900, 64450],


                    backgroundColor: 'hsla(169, 53%, 50%, 0.21)'
                } 

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
    
    componentDidMount() {
        this.loadSales();
    }

    loadSales = () => {
        console.log('loadSales function triggered');
        API.getSales()
          .then(res => {
            console.log('All divisions res.data = ', res.data);
            this.sortCookies(res.data);
            this.sortMotors(res.data);
            this.sortRNA(res.data);
          }).catch(err => console.log(err));
    }

    sortCookies = obj => {

        let newCookieDatasets = [];

        for (let i = 0; i < obj.cookies.length; i++) {
            
            const cookieColors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
            
            let theCookie = {
                label: '',
                data: [],
                backgroundColor: cookieColors[i]
            }

            theCookie.label = obj.cookies[i].cookie_name;
            theCookie.data.push(obj.cookies[i].Sales_1Q2018);
            theCookie.data.push(obj.cookies[i].Sales_2Q2018);
            theCookie.data.push(obj.cookies[i].Sales_3Q2018);
            theCookie.data.push(obj.cookies[i].Sales_4Q2018);

            newCookieDatasets.push(theCookie);

            console.log('cookie '+i+', for the chart = ', theCookie);
        }
        this.setState({
            cookieQuarterly: {
                datasets: newCookieDatasets
            }
        });
        console.log('NEW this.state.cookieQuarterly = ', this.state.cookieQuarterly);
    }

    sortMotors = obj => {

        let newMotorDatasets = [];

        for (let i = 0; i < obj.motors.length; i++) {
            
            const motorColors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
            
            let theMotor = {
                label: '',
                data: [],
                backgroundColor: motorColors[i]
            }

            theMotor.label = obj.motors[i].elecMotor_name;
            theMotor.data.push(obj.motors[i].Sales_1Q2018);
            theMotor.data.push(obj.motors[i].Sales_2Q2018);
            theMotor.data.push(obj.motors[i].Sales_3Q2018);
            theMotor.data.push(obj.motors[i].Sales_4Q2018);

            newMotorDatasets.push(theMotor);

            console.log('motor '+i+', for the chart = ', theMotor);
        }
        this.setState({
            motorQuarterly: {
                datasets: newMotorDatasets
            }
        });
        console.log('NEW this.state.motorQuarterly = ', this.state.motorQuarterly);
    }

    sortRNA = obj => {

        let newRNAdatasets = [];

        for (let i = 0; i < obj.RNA.length; i++) {
            
            const RNAcolors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
            
            let theStrand = {
                label: '',
                data: [],
                backgroundColor: RNAcolors[i]
            }

            theStrand.label = obj.RNA[i].mitochonProduct_name;
            theStrand.data.push(obj.RNA[i].Sales_1Q2018);
            theStrand.data.push(obj.RNA[i].Sales_2Q2018);
            theStrand.data.push(obj.RNA[i].Sales_3Q2018);
            theStrand.data.push(obj.RNA[i].Sales_4Q2018);

            newRNAdatasets.push(theStrand);

            console.log('motor '+i+', for the chart = ', theStrand);
        }
        this.setState({
            rnaQuarterly: {
                datasets: newRNAdatasets
            }
        });
        console.log('NEW this.state.rnaQuarterly = ', this.state.rnaQuarterly);
    }

    render() {
        const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
        return (
        <div>
        <section>
        <div className="well" style={wellStyles}>
            <h2>Sales Forecasts</h2>
        <Button.Group vertical>
          <Button fluid color='yellow' icon='bar chart' content='Quarterly Sales: Cookie Division' onClick={() => this.animated.show()} />
          <Button fluid color='grey' icon='bar chart' content='Quarterly Sales: Electric Motors Division' onClick={() => this.animatedmotors.show()} />
          <Button fluid color='yellow' icon='bar chart' content='Quarterly Sales: Mitochondrial RNA Division' onClick={() => this.animatedRNA.show()} />
          <Button fluid color='grey' icon='bar chart' content='Quarterly Sales: All Divisions' onClick={() => this.animatedquarterly.show()} />
          <Button fluid color='yellow' icon='pie chart' content='Annual Sales: All Divisions' onClick={() => this.animatedannual.show()} />
        </Button.Group>
        </div>
        </section>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animated = ref} 
        //   title="Quarterly Sales: Cookie Division"
          transitionDuration={500} 
        >
          <div className="chart">
            <Line
            data={this.state.cookieQuarterly}
            width={500}
	        height={370}
	        options={{
		        maintainAspectRatio: false
	        }}
            />
            </div>
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedmotors = ref} 
        //   title="Quarterly Sales: Electric Motors Division"
          transitionDuration={500} 
        >
          <div className="chart">
            <Line
            data={this.state.motorQuarterly}
            width={500}
            height={370}
            options={{
                maintainAspectRatio: false
            }}
            />
            </div>
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedRNA = ref} 
        //   title="Quarterly Sales: Mitochondrial RNA Division"
          transitionDuration={500} 
        >
          <div className="chart">
            <Line
            data={this.state.rnaQuarterly}
            width={500}
            height={370}
            options={{
                maintainAspectRatio: false
            }}
            />
            </div>
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedquarterly = ref} 
        //   title="Quarterly Sales: All Divisions"
          transitionDuration={500} 
        >
          <div className="chart">
            <Line
            data={this.state.chartDataQuarterly}
            width={500}
	        height={370}
	        options={{
		        maintainAspectRatio: false
	        }}
            />
            </div>
        </SkyLight>
        <SkyLight 
          hideOnOverlayClicked 
          ref={ref => this.animatedannual = ref} 
        //   title="Annual Sales: All Divisions"
          transitionDuration={500} 
        >
          <div className="chart">
            <Pie
            data={this.state.chartDataAnnual}
            width={500}
	        height={380}
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
