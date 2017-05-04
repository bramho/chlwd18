import React from 'react';
import { Text, View } from 'react-native';

import {General, MenuStyle } from '../assets/styles/General';
COLOR = require('../assets/styles/COLOR');

const TabItem = ({ selected, title }) => {
   return (
      <View style={MenuStyle.tabbarItemContainer}>
         <Text style={[MenuStyle.menuIcon ,{color: selected ? COLOR.RED : '#b2b2b2'}]}>ICON</Text>
         <Text style={[MenuStyle.menuItemText ,{color: selected ? COLOR.RED : '#b2b2b2'}]}>{title}</Text>
      </View>
   );
}

export default TabItem;
