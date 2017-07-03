import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { formatDate } from '../helpers/FormatDate';

import { ComponentStyle } from '../assets/styles/General';

const SectionHeader = (props) => (
   <View style={[ComponentStyle.sectionHeader]}>
      <Text style={ComponentStyle.sectionHeaderText}>{formatDate(props.section.key, 'listView')}</Text>
  </View>
);

export default SectionHeader;
