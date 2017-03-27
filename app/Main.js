import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import { getData } from './helpers/DataAPI';
import { getTranslation, setLocale } from './helpers/Translations.js';

import Basic from './assets/stylesheet';

import Menu from './components/Menu';

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Menu />
      );
   }
}
