import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { getData } from './helpers/DataAPI';
import { getTranslation, setLocale } from './helpers/Translations.js';

import Basic from './assets/stylesheets/stylesheet-basic'

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      // Call getData(api_link_url)
   }

   render() {
     return (
       <View style={Basic.container}>
         <Text style={Basic.h1}>
           {getTranslation('greeting')}
         </Text>
       </View>
     );
   }
}
