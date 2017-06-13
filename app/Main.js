import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';

import Scenes from './Scenes';

import { checkStorageKey, setStorageData, setCategoriesData } from './helpers/Storage';
import { statusBar } from './helpers/StatusBar';

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      statusBar('translucent');

      checkStorageKey('savedEvents').then((isValidKey) => {
         if (!isValidKey) {
            setStorageData('savedEvents', []);
         }
      });

      // Work around for BackAndroid message until there is a fix. (Issue #1842 - React-Native-Router-Flux)
      console.ignoredYellowBox = ['Warning: BackAndroid'];

      setCategoriesData();

   }

   render() {
      return (
         <Router scenes={Scenes} />
      );
   }
}
