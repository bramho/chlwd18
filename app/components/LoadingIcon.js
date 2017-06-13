import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';

COLOR = require('../assets/styles/COLOR');
import { ComponentStyle } from '../assets/styles/General';

export default class LoadingIcon extends Component {

   constructor(props) {
      super(props);

      this.state = {

      }
   }

   render() {
      return (
         <View style={ComponentStyle.loadingIconContainer}>
            <ActivityIndicator
               animating={true}
               size="large"
               color={COLOR.RED}
            />
         </View>
      )
   }
}
