import React, { Component } from 'react';
import { Scene, Actions } from 'react-native-router-flux';

// Import helpers
import { getTranslation } from './helpers/Translations';

// Import Components
import TabItem from './components/TabBar';

// Import Screens
import TestNews from './screens/TestNews';
import EventsList from './screens/EventsList';
import EventItem from './screens/EventItem';
import NewsList from './screens/NewsList';
import NewsItem from './screens/NewsItem';
import FavoriteList from './screens/FavoriteList';

const scenes = Actions.create(
   <Scene key="root" tabs={true}>
         <Scene
            key="tabbar"
            tabs
            tabBarStyle={[MenuStyle.basicMenuStyles, Colors.grayBackground, Colors.grayBorderTop]}
         >
            <Scene key="eventsTab" title={getTranslation('eventsMenuItem')} icon={TabItem}>
               <Scene
                 key="events"
                 initial
                 searchText
                 component={EventsList}
                 icon={TabItem}
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


            <Scene key="newsTab" title={getTranslation('newsMenuItem')} icon={TabItem}>
               <Scene
                 key="news"
                 initial
                 searchText
                 component={NewsList}
                 icon={TabItem}
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

            <Scene key="favoritesTab" title={getTranslation('favoritesMenuItem')} icon={TabItem}>
               <Scene
                 key="favorites"
                 component={FavoriteList}
                 title={getTranslation('favoritesMenuItem')}
                 icon={TabItem}
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

export default scenes;