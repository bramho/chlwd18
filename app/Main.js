import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Router } from 'react-native-router-flux';

import Scenes from './Scenes';

import { checkStorageKey, setStorageData } from './helpers/Storage';
import { platform } from './helpers/Platform';

export default class Main extends Component {

   constructor(props) {
      super(props);

   }

   componentDidMount() {
      checkStorageKey('savedEvents').then((isValidKey) => {
         if (!isValidKey) {
            setStorageData('savedEvents', []);
         }
         if(platform('Android')) { StatusBar.setBackgroundColor('blue', true) }
      });

   }

   render() {
      return (
         <Router scenes={Scenes} />
      );
   }
}
