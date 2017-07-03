import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';

import { General, SettingsStyles, ComponentStyle, FilterStyles } from '../assets/styles/General';

class AdvertisementScene extends Component {

   constructor(props) {
      super(props)

      this.state = {
         url: this.props.url
      }
   }

   // show or hide Modal based on 'hide' prop
   render() {
      return (
         <View>
            <View style={ComponentStyle.headerContainer}>
               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.pop()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="arrow-left" size={12} color={COLOR.DARKPURPLE} style={SettingsStyles.itemIcon} />
                  </View>
               </TouchableOpacity>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h2, ComponentStyle.headerTitle]}>
                     {getTranslation('advertisementText')}
                  </Text>
               </View>

               <View style={ComponentStyle.filterIconContainer}>
               </View>
            </View>

            <ScrollView style={General.generalPadding}>
               <TouchableOpacity style={SettingsStyles.itemContainer} onPress={() => Actions.pop()}>
                  <Text style={SettingsStyles.itemText}>{getTranslation('backToSettings')}</Text>
                  <Icon name="arrow-left" size={12} color={COLOR.DARKPURPLE} style={SettingsStyles.itemIcon} />
               </TouchableOpacity>

               <View style={SettingsStyles.textBlock}>
                  <Text style={SettingsStyles.text}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
               </View>
            </ScrollView>
         </View>
      )
   }
}

export default AdvertisementScene;
