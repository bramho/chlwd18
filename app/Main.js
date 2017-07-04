import React, { Component, TouchableOpacity } from 'react';
import { Router, Actions } from 'react-native-router-flux';

import Scenes from './Scenes';

import OnBoarding from './screens/OnBoarding';

import { checkStorageKey, setStorageData, setCategoriesData, removeItemFromStorage } from './helpers/Storage';
import { statusBar } from './helpers/StatusBar';

const ONBOARDING_STORAGE_KEY = 'onBoardingComplete';

export default class Main extends Component {

   constructor(props) {
      super(props);

      this.state = {

      }
   }

   componentDidMount() {
      statusBar('translucent');

      checkStorageKey('savedEvents').then((isValidKey) => {
         if (!isValidKey) {
            setStorageData('savedEvents', []);
         }
      });

      // removeItemFromStorage(ONBOARDING_STORAGE_KEY);

      checkStorageKey(ONBOARDING_STORAGE_KEY).then((isValidKey) => {
         if (!isValidKey) {
            Actions.onBoarding();
         }
      });

      // Work around for BackAndroid message until there is a fix. (Issue #1842 - React-Native-Router-Flux)
      console.ignoredYellowBox = ['Warning: BackAndroid'];

      setCategoriesData();

   }

   render() {
      return(
         <Router scenes={Scenes} />
      );
   }
}
