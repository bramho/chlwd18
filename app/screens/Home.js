import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { Scene,Actions } from 'react-native-router-flux';

import { getTranslation, setLocale } from '../helpers/Translations.js';

import { General, Colors} from '../assets/styles/General';

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   render() {
     return (
       <View style={[General.container, Colors.backgroundStandard]}>
         <Text style={[General.h1, General.title]}>
            <Text>
               {getTranslation('homePageTitle')}
            </Text>

            <Text style={[General.bold, General.subTitle]}>
               {getTranslation('homePageSubTitle')}
            </Text>
         </Text>
       </View>
     );
   }
}
