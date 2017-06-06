/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet} from "react-native";

COLOR = require('./COLOR');

export default FilterStyles = StyleSheet.create({
   filterItemContainer: {
      margin: 10,
   },
   innerFilterItem: {
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      paddingLeft: 10,
      borderWidth: 1,
      borderColor: COLOR.BLUEGRAY,
   }
});
