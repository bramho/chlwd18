import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';

import Scenes from './Scenes';

import { checkStorageKey, setStorageData } from './helpers/Storage';
import { statusBar } from './helpers/StatusBar';

export default class Main extends Component {

   constructor(props) {
      super(props);

   }

   componentDidMount() {
      checkStorageKey('savedEvents').then((isValidKey) => {
         if (!isValidKey) {
            setStorageData('savedEvents', []);
         }
         statusBar('translucent');
      });

   }

   render() {
      return (
         <Router scenes={Scenes} />
      );
   }
}
