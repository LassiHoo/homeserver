import React, {Component} from 'react';
import { connect } from 'mqtt';
import Plotgraph from './plotgraph'

var mqtt = require('mqtt')
var client

const testdata =[{ name: "Sauna", data:[
  //["time", "Temperature"],
  {time:"02:03:19", value: 12},
  {time:"02:04:19", value: 1},
  {time:"02:05:19", value: 120},
  {time:"02:06:19", value: 192},
  {time:"02:07:19", value: 19},
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
    console.log("topic:")
    console.log(topic)
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

        testdata.push({name:subscribe_channel,data:[]});

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
      console.log("data, sensornamelist:");
      console.log(sensorNameList);
      console.log("testdata");
      console.log(testdata);
      console.log(testdata.length);
      console.log("message");
      console.log(message);
       for (var i = 0; i < testdata.length; i++) {
         if ( testdata[i].name === topic )
         {
           testdata[i].data=[];
           var str = String.fromCharCode.apply(null,message);
           console.log(str);
           var object = JSON.parse(str);
           for (var u = 0; u < object["time"].length; u++) {
             const add = {time:object["time"][u],value:object["temp"][u]};
            //ffkööökkkddd
             console.log("Add  json value");
             console.log(add);
             testdata[i].data.push(add);
           }
           console.log("data added, testdata content");
           console.log(testdata);
           this.setState({chartData: testdata});
           break;
         }
       }
    }

  }

  renderGraphs(i){
    const graph = this.state.chartData[i].data;
    const sensor_name_topic = this.state.chartData[i].name;
    //const sensor_name = sensor_name_topic.split("");
    const sensor_name = sensor_name_topic.substring(sensor_name_topic.lastIndexOf('/') + 1);
    console.log(sensor_name);

    return(
      <div className="PlotGraph">
        <Plotgraph temperature={graph} name={sensor_name}/>
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
