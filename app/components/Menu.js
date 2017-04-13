import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import { getTranslation } from '../helpers/Translations';

import {Colors, MenuStyle} from '../assets/styles/General';

import Home from '../screens/Home';

import EventItem from '../screens/EventItem'; // For testing purposes ONLY
import TestNews from '../screens/TestNews'; // For testing purposes ONLY
import EventsList from '../screens/EventsList';

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
                tabBarStyle={[MenuStyle.basicMenuStyles, Colors.grayBackground, Colors.grayBorderTop]}
               >
               <Scene key="events" title={getTranslation('eventsMenuItem')} icon={TabIcon}>

                     <Scene
                       key="testEvents"
                       component={EventsList}
                       title={getTranslation('eventsMenuItem')}
                       hideNavBar
                       initial
                     />

                  </Scene>
                  <Scene key="news" title={getTranslation('newsMenuItem')} icon={TabIcon}>

                     <Scene
                       key="testNews"
                       component={TestNews}
                       title={getTranslation('newsMenuItem')}
                       initial
                     />
                  </Scene>



                     <Scene
                       key="eventItem"
                       component={EventItem}
                       title={getTranslation('newsMenuItem')}
                       initial
                       hideNavBar
                     />


               </Scene>

            </Scene>
         </Router>
      );
   }
}
