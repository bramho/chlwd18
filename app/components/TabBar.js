import React from 'react';
import { Text, } from 'react-native';

import {General, MenuStyle} from '../assets/styles/General';

const TabItem = ({ selected, title }) => {
   return (
      <Text style={{fontWeight: selected ? 'bold' : 'normal'}}>{title}</Text>
   );
}

export default TabItem;
