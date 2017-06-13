import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';

import { General, EventStyle, ComponentStyle, ListViewStyle, Tags, Buttons } from '../assets/styles/General';

class WebModal extends Component {

   constructor(props) {
      super(props)

      this.state = {
         url: this.props.url
      }
   }

   // show or hide Modal based on 'hide' prop
   render() {
      return (
         <View style={[General.container, {backgroundColor: '#F02C32'}]}>
            <View style={ComponentStyle.singleHeaderContainer}>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.backIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={25} color="#fff" />
                  </View>
               </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
               <WebView
                  source={{uri: this.state.url}}
                  style={{marginBottom: 60}}
               />
            </View>
         </View>
      )
   }
}

export default WebModal;
