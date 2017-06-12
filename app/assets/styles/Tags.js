/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet} from "react-native";

COLOR = require('./COLOR');

export default Tags = StyleSheet.create({
   categoriesContainer: {
      flexDirection: 'row',
      marginTop: 12
   },
   categoryItemContainer: {
      marginRight: 10,
      padding: 3,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 10,
   },
   categoryItem: {
      fontSize: 12,
      color: COLOR.BLACK,
      fontFamily: 'Muli-Regular',
   },
   dance: {
      backgroundColor: 'rgb(77, 76, 193)',
   },
   culture: {
      backgroundColor: COLOR.WHITE,
   },
});
