import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Basic from '../assets/stylesheet'

export default class TestEvents extends Component {

   constructor(props) {
      super(props);
   }

   render() {
     return (
       <View style={Basic.container}>
         <Text style={[Basic.h1, Basic.title]}>
            Events
         </Text>
       </View>
     );
   }
}
