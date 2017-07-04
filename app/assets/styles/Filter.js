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
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 3,
   },
   innerFilterContainer: {
      padding: 25,
   },
   innerFilterRow: {
      flex: 1,
      flexDirection: 'row'
   },
   innerFilterColumn: {
      flex: 1,
      flexDirection: 'column'
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
   itemIconContainer: {
      alignItems: 'center',
      paddingBottom: 5
   },
   scollViewContainer: {
      margin: 15,
      marginTop: 0
   },
   resetText: {
      textAlign: 'center',
      color: 'rgba(56, 56, 56, 0.4)',
      textDecorationLine: 'underline'
   },
   selectDateButton: {
      flexDirection: 'row',
      flex: 1,
      marginRight: 5,
      borderWidth: 1,
      borderColor: COLOR.BLUEGRAY,
      borderRadius: 5,
   },
   selectButtonLeftSide: {
      padding: 10,
      flex: 4,
      flexDirection: 'column',
   },
   selectButtonRightSide: {
      padding: 10,
      flex: 1,
      flexDirection: 'column',
      borderLeftWidth: 1,
      borderColor: COLOR.BLUEGRAY,
   },
   selectButtonIcon: {
      textAlign: 'center',
      color: COLOR.LIGHTBLUE,
   },
});
