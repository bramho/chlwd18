import React, { Component } from 'react';
import { Text, View, StatusBar, Platform } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import { getTranslation } from '../helpers/Translations';
import { platform } from '../helpers/Platform';

import {General, MenuStyle} from '../assets/styles/General';


import Home from '../screens/Home';

import TestNews from '../screens/TestNews';
import EventsList from '../screens/EventsList';
import EventItem from '../screens/EventItem';
import NewsList from '../screens/NewsList';
import NewsItem from '../screens/NewsItem';
import FavoriteList from '../screens/FavoriteList';

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
         tabBarStyle={[MenuStyle.basicMenuStyles, General.grayBackground, General.grayBorderTop]}
         >
            <Scene key="eventsTab" title={getTranslation('eventsMenuItem')} icon={TabIcon}>
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


            <Scene key="newsTab" title={getTranslation('newsMenuItem')} icon={TabIcon}>
               <Scene
                 key="news"
                 initial
                 searchText
                 component={NewsList}
                 icon={TabIcon}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />
               <Scene
                 key="newsItem"
                 component={NewsItem}
                 sceneStyle={MenuStyle.container}
                 hideNavBar = {false}
                 navigationBarStyle={MenuStyle.transparentNavbar}
               />
            </Scene>

            <Scene key="favoritesTab" title={getTranslation('favoritesMenuItem')} icon={TabIcon}>
               <Scene
                 key="favorites"
                 component={FavoriteList}
                 title={getTranslation('favoritesMenuItem')}
                 icon={TabIcon}
                 sceneStyle={MenuStyle.container}
               />
               <Scene
                 key="eventItemFavorites"
                 component={EventItem}
                 sceneStyle={MenuStyle.container}
                 hideNavBar = {false}
                 navigationBarStyle={MenuStyle.transparentNavbar}
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
