import React, { Component } from 'react';
import { Scene, Actions } from 'react-native-router-flux';

// Import helpers
import { getTranslation } from './helpers/Translations';

import { General } from './assets/styles/General';
// Import Components
import TabItem, { TabItemNews, TabItemFav,TabItemMaps } from './components/TabBar';

// Import Screens
import TestNews from './screens/TestNews';
import EventsList from './screens/EventsList';
import EventItem from './screens/EventItem';
import NewsList from './screens/NewsList';
import NewsItem from './screens/NewsItem';
import FavoriteList from './screens/FavoriteList';
import Maps from './screens/Maps';

import WebModal from './screens/WebModal';
import FilterModal from './screens/FilterModal';

import { statusBar } from './helpers/StatusBar';

const scenes = Actions.create(
      <Scene key="root" tabs={true}>
         <Scene
            key="tabbar"
            tabs
            tabBarStyle={[MenuStyle.basicMenuStyles, General.grayBorderTop]}
         >
            <Scene key="newsTab" title={getTranslation('newsMenuItem')} icon={TabItemNews}>
               <Scene
                 key="news"

                 searchText
                 component={NewsList}
                 icon={TabItemNews}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />
               <Scene
                 key="newsItem"
                 component={NewsItem}
                 sceneStyle={MenuStyle.container}
                 hideNavBar = {false}
                 navigationBarStyle={MenuStyle.newsNavbar}
                 backTitle={getTranslation('navBarBackTitle')}
                 backButtonTextStyle={MenuStyle.newsBackButtonTextStyle}
                 leftButtonIconStyle={MenuStyle.newsBackButtonIconStyle}
                 rightButtonTextStyle={MenuStyle.newsBackButtonTextStyle}
                 hideNavBar
               />
            </Scene>

            <Scene key="eventsTab" title={getTranslation('eventsMenuItem')} icon={TabItem}>
               <Scene
                 key="events"

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
                 backTitle={getTranslation('navBarBackTitle')}
                 onBack={()=>{statusBar(),Actions.pop()}}
                 backButtonTextStyle={MenuStyle.backButtonTextStyle}
                 leftButtonIconStyle={MenuStyle.backButtonIconStyle}
                 rightButtonTextStyle={MenuStyle.backButtonTextStyle}
                 hideNavBar
               />
               <Scene
                  key="webModal"
                  component={WebModal}
                  direction="horizontal"
                  hideNavBar
               />
               <Scene
                  key="filterModal"
                  component={FilterModal}
                  direction="horizontal"
                  hideNavBar
               />
            </Scene>

            <Scene key="favoritesTab" title={getTranslation('favoritesMenuItem')} icon={TabItemFav}>
               <Scene
                 key="favorites"
                 component={FavoriteList}
                 title={getTranslation('favoritesMenuItem')}
                 icon={TabItemFav}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />
               <Scene
                 key="eventItemFavorites"
                 component={EventItem}
                 sceneStyle={MenuStyle.container}
                 hideNavBar = {false}
                 navigationBarStyle={MenuStyle.transparentNavbar}
                 backTitle={getTranslation('navBarBackTitle')}
                 backButtonTextStyle={MenuStyle.backButtonTextStyle}
                 leftButtonIconStyle={MenuStyle.backButtonIconStyle}
                 rightButtonTextStyle={MenuStyle.backButtonTextStyle}
                 hideNavBar
               />
            </Scene>
            <Scene key="mapsTab" title={getTranslation('mapsMenuItem')} icon={TabItemMaps}>
               <Scene
                 key="maps"
                 component={Maps}
                 title={getTranslation('favoritesMenuItem')}
                 icon={TabItemMaps}
                 sceneStyle={MenuStyle.container}
                 hideNavBar
               />
               <Scene
                 key="eventItemMaps"
                 component={EventItem}
                 sceneStyle={MenuStyle.container}
                 hideNavBar = {false}
                 navigationBarStyle={MenuStyle.transparentNavbar}
                 backTitle={getTranslation('navBarBackTitle')}
                 onBack={()=>{statusBar(),Actions.pop()}}
                 backButtonTextStyle={MenuStyle.backButtonTextStyle}
                 leftButtonIconStyle={MenuStyle.backButtonIconStyle}
                 rightButtonTextStyle={MenuStyle.backButtonTextStyle}
                 hideNavBar
               />
            </Scene>
         </Scene>
      </Scene>
);

export default scenes;
