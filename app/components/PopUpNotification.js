import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

COLOR = require('../assets/styles/COLOR');
import { ComponentStyle } from '../assets/styles/General';

export default class PopUpNotification extends Component {

   constructor(props) {
      super(props);

      this.state = {

      }
   }

   render() {
      return (
         <Text style={ComponentStyle.popUpContainer}>
            Hallo!
         </Text>
      )
   }
}
