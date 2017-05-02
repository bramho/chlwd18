import React, { Component } from 'react';

import Menu from './components/Menu';

import { checkStorageKey, setStorageData } from './helpers/Storage';

export default class Main extends Component {

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      checkStorageKey('savedEvents').then((isValidKey) => {
         if (!isValidKey) {
            setStorageData('savedEvents', []);
         }
      });
   }

   render() {
      return (
         <Menu />
      );
   }
}
