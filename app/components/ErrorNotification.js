import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getError } from '../helpers/Errors';

COLOR = require('../assets/styles/COLOR');
import { ComponentStyle } from '../assets/styles/General';

export default class ErrorNotification extends Component {

   constructor(props) {
      super(props);

      this.state = {
         errorNumber: props.errorNumber,
      }
   }

   render() {
      return (
         <View style={ComponentStyle.errorContainer}>
            <Text style={ComponentStyle.errorText}>
               {getError(this.state.errorNumber)}
            </Text>
         </View>
      )
   }
}
