import React, {Component} from 'react';
import Chart from 'react-google-charts';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip} from "recharts";


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
      <LineChart width={500} height={300} data={this.props.temperature}
      key={Math.random()}>
    <XAxis dataKey="time" tick={{fontSize: 15}}/>
    <YAxis tick={{fontSize: 15}} />
    <Tooltip/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
  </LineChart>
  </div>
    );
  }
}
export default Plotgraph;
