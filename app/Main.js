import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { getData } from './helpers/DataAPI';

import Translations from './helpers/Translations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default class Main extends Component {
   constructor(props) {
      super(props);
   }

   componentWillMount() {
      // Call getData(api_link_url)
   }

   render() {
     return (
       <View style={styles.container}>
            <Text style={styles.welcome}>
              {I18n.t('greeting')}
            </Text>
       </View>
     );
   }
}
