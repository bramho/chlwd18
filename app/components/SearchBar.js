import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ListView } from 'react-native';

// import SearchBar from 'react-native-searchbar'

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';

import Colors from '../assets/styles/General';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C1C1C1',
   },
   input: {
      height: 30,
      flex: 1,
      paddingHorizontal: 8,
      fontSize: 15,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
   },
});


export default class SearchBarComponent extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View style={styles.container}>
            <TextInput
               style={styles.input}
               placeholder={getTranslation('searchTerm')}
               onChange={this.setSearchText.bind(this)}
            />
         </View>
      );
   }
}
