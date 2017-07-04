import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { General } from '../assets/styles/General';

export default class TestNews extends Component {

   constructor(props) {
      super(props);
   }

   render() {
     return (
       <View style={General.container}>
         <Text style={[General.h1, General.title]}>
            News
         </Text>
       </View>
     );
   }
}
