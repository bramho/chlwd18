import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {General, MenuStyle } from '../assets/styles/General';
COLOR = require('../assets/styles/COLOR');

const TabItem = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name="calendar" size={20} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
         <Text style={[MenuStyle.menuItemText ,{color: selected ? COLOR.RED : '#b2b2b2'}]}>{title}</Text>
      </View>
   );
}

export const TabItemNews = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name="newspaper-o" size={20} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
         <Text style={[MenuStyle.menuItemText ,{color: selected ? COLOR.RED : '#b2b2b2'}]}>{title}</Text>
      </View>
   );
}

export const TabItemFav = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Icon name="heart-o" size={20} style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}></Icon>
         <Text style={[MenuStyle.menuItemText ,{color: selected ? COLOR.RED : '#b2b2b2'}]}>{title}</Text>
      </View>
   );
}

export default TabItem;
