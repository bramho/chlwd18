import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import { getTranslation } from '../helpers/Translations';

import Basic from '../assets/stylesheet';

import Home from '../screens/Home';

import TestEvents from '../screens/TestEvents'; // For testing purposes ONLY
import TestNews from '../screens/TestNews'; // For testing purposes ONLY

const TabIcon = ({ selected, title }) => {
   return (
      <Text style={{fontWeight: selected ? 'bold' : 'normal'}}>{title}</Text>
   );
}

export default class Menu extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Router>
            <Scene key="root">

               <Scene
                key="tabbar"
                tabs
                tabBarStyle={{ backgroundColor: '#ccc', height: 60, borderTopColor: "#666666", borderTopWidth: 1 }}
               >

                  <Scene
                     key="home"
                     component={Home}
                     title="Home"
                     hideNavBar
                  />

               <Scene key="events" title={getTranslation('eventsMenuItem')} icon={TabIcon}>

                     <Scene
                       key="testEvents"
                       component={TestEvents}
                       title="TestEvents"
                       initial
                     />

                  </Scene>

                  <Scene key="news" title={getTranslation('newsMenuItem')} icon={TabIcon}>

                     <Scene
                       key="testNews"
                       component={TestNews}
                       title="TestNews"
                       initial
                     />

                  </Scene>

               </Scene>

            </Scene>
         </Router>
      );
   }
}
