import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';

import { General, SettingsStyles, ComponentStyle, FilterStyles } from '../assets/styles/General';

class SettingsScene extends Component {

   constructor(props) {
      super(props)

      this.state = {

      }
   }

   render() {
      return (
         <View>
            <View style={ComponentStyle.headerContainer}>
               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.pop()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={32} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h2, ComponentStyle.headerTitle]}>
                     {getTranslation('settingsTitle')}
                  </Text>
               </View>

               <View style={ComponentStyle.filterIconContainer}>
               </View>
            </View>

            <ScrollView style={General.generalPadding}>
               <Text style={General.h4}>{getTranslation('settingsAbout')}</Text>

               <TouchableOpacity style={SettingsStyles.itemContainer} onPress={() => Actions.advertisement()}>
                  <Text style={SettingsStyles.itemText}>{getTranslation('advertisementText')}</Text>
                  <Icon name="arrow-right" size={12} color={COLOR.DARKPURPLE} style={SettingsStyles.itemIcon} />
               </TouchableOpacity>

               <TouchableOpacity style={SettingsStyles.itemContainer}>
                  <Text style={SettingsStyles.itemText}>{getTranslation('terms')}</Text>
                  <Icon name="pdf" size={16} color={COLOR.DARKPURPLE} style={SettingsStyles.itemIcon} />
               </TouchableOpacity>

               <TouchableOpacity style={SettingsStyles.itemContainer}>
                  <Text style={SettingsStyles.itemText}>{getTranslation('privacy')}</Text>
                  <Icon name="pdf" size={16} color={COLOR.DARKPURPLE} style={SettingsStyles.itemIcon} />
               </TouchableOpacity>

               <TouchableOpacity style={SettingsStyles.itemContainer} onPress={() => Actions.developmentBy()}>
                  <Text style={SettingsStyles.itemText}>{getTranslation('developedBy')} </Text>
                  <Icon name="arrow-right" size={12} color={COLOR.DARKPURPLE} style={SettingsStyles.itemIcon} />
               </TouchableOpacity>

               <View style={SettingsStyles.itemContainer}>
                  <Text style={SettingsStyles.itemText}>{getTranslation('version')} 1.0.0</Text>
               </View>

               <TouchableOpacity style={{marginTop: 20}} onPress={() => Actions.onBoarding()}>
                  <Text style={FilterStyles.resetText}>
                     {getTranslation('watchOnboarding')}
                  </Text>
               </TouchableOpacity>
            </ScrollView>
         </View>
      )
   }
}

export default SettingsScene;
