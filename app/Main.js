import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { getTranslation, setLocale } from './helpers/Translations.js';

import EventsList from './screens/EventsList';

import Basic from './assets/stylesheet';

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   render() {
     return (//https://jsonplaceholder.typicode.com/posts
       <EventsList/>
     );
   }
}
