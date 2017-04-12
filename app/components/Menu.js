import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import { getTranslation } from '../helpers/Translations';

import {General,Colors, MenuStyle} from '../assets/styles/General';


import Home from '../screens/Home';

import TestEvents from '../screens/TestEvents'; // For testing purposes ONLY
import TestNews from '../screens/TestNews'; // For testing purposes ONLY
import EventsList from '../screens/EventsList';

const TabIcon = ({ selected, title }) => {
   return (
      <Text style={{fontWeight: selected ? 'bold' : 'normal'}}>{title}</Text>
   );
}

const scenes = Actions.create(
   <Scene key="root" tabs={true}>
         <Scene
         key="tabbar"
         tabs
         tabBarStyle={[MenuStyle.basicMenuStyles, Colors.grayBackground, Colors.grayBorderTop]}
         >
            <Scene key="eventsTab" title="Events" icon={TabIcon}>
               <Scene
                 key="events"
                 initial
                 searchText
                 component={EventsList}
                 title={getTranslation('eventsMenuItem')}
                 icon={TabIcon}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />

               <Scene
                 key="singelEvent"
                 component={TestEvents}
                 title={getTranslation('newsMenuItem')}
                 sceneStyle={MenuStyle.container}
               />
            </Scene>


            <Scene key="newsTab" title="News" icon={TabIcon}>
               <Scene
                 key="news"
                 component={TestNews}
                 title={getTranslation('newsMenuItem')}
                 icon={TabIcon}
                 sceneStyle={MenuStyle.container}
               />
            </Scene>
         </Scene>
   </Scene>
);

export default class Menu extends Component {

   constructor(props) {
      super(props);
      StatusBar.setBackgroundColor('blue', true);
   }
   render() {
      return (
         <Router scenes={scenes} />
      );
   }
}
