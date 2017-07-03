import React from 'react';
import { Text, View } from 'react-native';
import Icon from '../helpers/Icons';

import {General, MenuStyle } from '../assets/styles/General';
COLOR = require('../assets/styles/COLOR');

const TabItem = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name={selected ? 'events-fill' : 'events'} size={25} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
      </View>
   );
}

export const TabItemNews = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name={selected ? 'news-fill' : 'news'} size={25} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
      </View>
   );
}

export const TabItemFav = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name={selected ? 'heart-fill' : 'heart'} size={25} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
      </View>
   );
}

export const TabItemMaps = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name={selected ? 'pointer-fill' : 'pointer'} size={25} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
      </View>
   );
}

export default TabItem;
