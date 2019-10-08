import React, {Component} from 'react';
import Chart from 'react-google-charts';


class Plotgraph extends Component{

  constructor(props) {
    console.log("contructing plotgraph")
    super(props);
    this.state = {
     chartData: this.props.temperature
   }
  }

  setDataToState(){
      this.setState({chartData: this.props.temperature});
}

componentDidMount(){
  console.log("plotgraph component mount");
  console.log(this.props.temperature)
  this.setDataToState();
}


  render() {
    console.log("plotgraph render")
    console.log(this.props.temperature)
    return (
      <div>
      <Chart
    width={500}
    height={'300px'}
    chartType="AreaChart"
    loader={<div>Loading Chart</div>}
    data={this.props.temperature}
    options={{
      title: this.props.name,
      hAxis: { title: 'sensor data', titleTextStyle: { color: '#333' } },
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
