import React, {Component} from 'react';
import { connect } from 'mqtt';
import Plotgraph from './plotgraph'

var mqtt = require('mqtt')
var client

const testdata =[{ name: "initial", data:[
  ["time", "Temperature"],
  [1, 12],
  [2, 33],
  [3, 3],
  [4, 20],
  [5, 18],
  [6, 14]
]}];
const SENSOR_NAME = 'sensors/name';
const SENSOR_DATA_LIN = 'sensors/data/linear';
const SENSOR_DATA_LOG = 'sensors/data/log';
const sensorNameList = [];
class MQTTtest extends Component{


  constructor() {

    super();
    this.state = {
    chartData:testdata
    }
   this.processMessage = this.processMessage.bind(this);
    client  = new mqtt.connect("mqtt:127.0.0.1:9001")

    client.on('connect', function () {
      client.subscribe(SENSOR_NAME, function (err) {
        if (err) {
          console.log("Failed to subscribe");
        }
      })
    })
  }


  processMessage (topic,message,packet){

    var subscribe_channel = ""
    if (topic == SENSOR_NAME)
    {
      subscribe_channel = SENSOR_NAME + "/" + message;

      let sensor = testdata.find(v=>
        v.name === subscribe_channel
      );
      if (!sensor)
      {
        // sensor is not included in MQTT network, add device to
        // sensorNameList and sbuscibe the subscribe_channel
  
        testdata.push({name:subscribe_channel,data: [["time", "Temperature"]]});

        client.subscribe(subscribe_channel, function (err) {
          if (err) {
            console.log("Failed to subscribe device:");
            console.log(subscribe_channel)
          }
          else{
            console.log("device, subscribe:");
            console.log(subscribe_channel)
          }
        })
      }
    }
    else
    {
       console.log(sensorNameList);
       for (var i = 0; i < testdata.length; i++) {
         if ( testdata[i].name === topic )
         {
           var str = String.fromCharCode.apply(null,message);
           var object = JSON.parse(str);
           const add = [];
           add[0] = object["time"]
           add[1] = object["temp"]
           testdata[i].data.push(add);
           console.log("data added, testdata content");
           console.log(testdata);
           this.setState({chartData: testdata});
           break;
         }
       }
    }

  }

  renderGraphs(i){
    const graph = this.state.chartData[i].data
    return(
      <div className="PlotGraph"> 
        <Plotgraph temperature={graph}/>
      </div>
      
    );

  }

  componentDidMount(){
      client.on('message',this.processMessage);
  }
  render(){
    const allGraphs = [];
    for (let index = 0; index < this.state.chartData.length; index++) {
        allGraphs.push(this.renderGraphs(index));
  
    }
    {/*<Plotgraph temperature={this.state.chartData}/>*/} 
    return(
      <div>{allGraphs}</div>
    );
  }
}
export default MQTTtest;
