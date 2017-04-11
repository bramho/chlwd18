import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ListView, StatusBar, Animated   } from 'react-native';
import { Actions } from 'react-native-router-flux';

// import SearchBar from 'react-native-searchbar'

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';

import Colors from '../assets/styles/General';

const MainColor = '#2196F3';

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
   header: {
    backgroundColor: MainColor,
    padding:8,
    top: 0,
    height:64,
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'absolute',
  },
});


export default class NavBarComponent extends Component {

   constructor(props) {
      super(props);
   }
   componentDidMount() {
      StatusBar.setBackgroundColor(MainColor, true);
   }
   setSearchText(event) {
      searchText = event.nativeEvent.text;
      //Actions.Events({searchText:searchText})
   }
   render() {
      return (
         <Animated.View style={styles.header}>
            <TextInput
               style={styles.input}
               placeholder={getTranslation('searchTerm')}
               onChange={this.setSearchText.bind(this)}
            />
         </Animated.View>
      );
   }
}
