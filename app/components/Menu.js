import React, { Component } from 'react';
import { Text, View, StatusBar, Platform } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import { getTranslation } from '../helpers/Translations';
import { platform } from '../helpers/Platform';

import {General,Colors, MenuStyle} from '../assets/styles/General';


import Home from '../screens/Home';

import EventItem from '../screens/EventItem'; // For testing purposes ONLY
import TestNews from '../screens/TestNews'; // For testing purposes ONLY
import EventsList from '../screens/EventsList';
import NewsList from '../screens/EventsList';

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
                 icon={TabIcon}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />
               <Scene
                 key="eventItem"
                 component={EventItem}
                 sceneStyle={MenuStyle.container}
                 hideNavBar = {false}
                 navigationBarStyle={MenuStyle.transparentNavbar}
               />
            </Scene>


            <Scene key="newsTab" title="News" icon={TabIcon}>
               <Scene
                 key="events"
                 initial
                 searchText
                 component={NewsList}
                 icon={TabIcon}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />
            </Scene>
         </Scene>
   </Scene>
);

export default class Menu extends Component {

   constructor(props) {
      super(props);
      if(platform('Android')) { StatusBar.setBackgroundColor('blue', true) }
   }
   render() {
      return (
         <Router scenes={scenes} />
      );
   }
}
