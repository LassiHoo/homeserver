import React, {Component} from 'react';
import Chart from 'react-google-charts';

class Plotgraph extends Component{

  constructor(props) {
    super(props);
    this.state = {
     chartData:null
   }
  }

  setDataToState(){
    
    this.setState({chartData: this.props.temperature});
}

componentDidMount(){
console.log("component mount");
this.setDataToState();
}


  render() {
    return (
      <div>
      <Chart
    width={300}
    height={'300px'}
    chartType="AreaChart"
    loader={<div>Loading Chart</div>}
    data={this.state.chartData}
    options={{
      title: 'hep',
      hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      // For the legend to fit, we make the chart area smaller
      chartArea: { width: '50%', height: '70%' },
      // lineWidth: 25
    }}
  />
  </div>
    );
  }
}

export default Plotgraph;
