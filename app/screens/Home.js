import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { getTranslation, setLocale } from '../helpers/Translations.js';

import Basic from '../assets/stylesheets/stylesheet-basic';
import Colors from '../assets/stylesheets/stylesheet-colors';

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   render() {
     return (
       <View style={[Basic.container, Colors.backgroundStandard]}>
         <Text style={[Basic.h1, Basic.title]}>
            <Text>
               {getTranslation('homePageTitle')}
            </Text>

            <Text style={[Basic.bold, Basic.subTitle]}>
               {getTranslation('homePageSubTitle')}
            </Text>
         </Text>
       </View>
     );
   }
}
