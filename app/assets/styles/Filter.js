/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet} from "react-native";

COLOR = require('./COLOR');

export default FilterStyles = StyleSheet.create({
   filterItemContainer: {
      margin: 5,
      width: 100,
      height: 75,
   },
   innerFilterItem: {
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 3,
   },
   innerFilterBorderGray: {
      borderColor: COLOR.BLUEGRAY,
   },
   innerFilterBorderBlue: {
      borderColor: COLOR.LIGHTBLUE,
   },
   itemText: {
      fontSize: 12,
      textAlign: 'center'
   },
   itemTextColorGray: {
      color: COLOR.BLACK40,
   },
   itemTextColorBlue: {
      color: COLOR.LIGHTBLUE,
   },
});
