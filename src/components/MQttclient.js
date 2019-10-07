import React, {Component} from 'react';
import { connect } from 'mqtt';
import Plotgraph from './plotgraph'

var mqtt = require('mqtt')
var client

const testdata = [
  ["time", "Temperature"],
  [1, 12],
  [2, 33],
  [3, 3],
  [4, 20],
  [5, 18],
  [6, 14]
];
class MQTTtest extends Component{


  constructor() {

    super();
    this.state = {
    chartData:null
    }
   this.processMessage = this.processMessage.bind(this);
    client  = new mqtt.connect("mqtt:127.0.0.1:9001")

    client.on('connect', function () {
      client.subscribe('Heppuhei', function (err) {
        if (err) {
          console.log("Failed to subscribe");
        }
      })
    })
  }

  processMessage(topic,message,packet){

    var str = String.fromCharCode.apply(null,message);
    var object = JSON.parse(str);
    const add = [];
    add[0] = object["time"]
    add[1] = object["temp"]
    const hepdata = testdata;
    testdata.push(add);
    this.setState({chartData: testdata});
    console.log("state content");
    console.log(this.state.chartData);
  }

  componentDidMount(){
      client.on('message',this.processMessage);

    // client.addEventListener('packetreceive',function(packet){
    //   console.log('receiving packet')
    //   console.log(packet);
    //     })
  }
  render(){
    console.log("state content in render");
    console.log(this.state.chartData);
    return(
      <Plotgraph temperature={this.state.chartData}/>
    );
  }
}
export default MQTTtest;
