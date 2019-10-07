import React, {Component} from 'react';
import { connect } from 'mqtt';

var mqtt = require('mqtt')
var client
class MQTTtest extends Component{


  constructor() {

    super();

    client  = new mqtt.connect("mqtt:127.0.0.1:9001")

    client.on('connect', function () {
      client.subscribe('Heppuhei', function (err) {
        if (!err) {
          client.publish('Heppuhei', 'Dodidodidodo')
        }
      })
    })
  }

  componentDidMount(){


    client.on('message', function (topic, message) {
    // message is Buffer
      console.log(message.toString())

    })

      client.on('packetreceive',function(packet){
        console.log("receiving packet");
        console.log(packet);
      });

    // client.addEventListener('packetreceive',function(packet){
    //   console.log('receiving packet')
    //   console.log(packet);
    //     })
  }
  render(){
    return(
      <div>hep </div>
    );
  }
}
export default MQTTtest;
