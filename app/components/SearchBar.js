import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

// import SearchBar from 'react-native-searchbar'

import { getTranslation } from '../helpers/Translations';

import Colors from '../assets/stylesheets/stylesheet-colors';


export default class SearchBarComponent extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View style={{flex: 1,
         padding: 8,
         flexDirection: 'row',
         alignItems: 'center',
         backgroundColor: '#C1C1C1',}}>
            <TextInput
               style={{height: 30,
                  flex: 1,
                  paddingHorizontal: 8,
                  fontSize: 15,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,}}
               placeholder="Search..."
            />
         </View>
      );
   }
}
