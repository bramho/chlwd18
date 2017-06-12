import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { General } from '../assets/styles/General'

export default class TestEvents extends Component {

   constructor(props) {
      super(props);
      console.log(this.props.eventId);
   }

   render() {
     return (
       <View style={General.container}>
         <Text style={[General.h1, General.title]}>
            Events
         </Text>
       </View>
     );
   }
}
