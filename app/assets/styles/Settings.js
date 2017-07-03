/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet} from "react-native";

COLOR = require('./COLOR');

export default Settings = StyleSheet.create({
   itemContainer: {
      padding: 8,
      borderWidth: 1,
      borderColor: COLOR.BLUEGRAY,
      borderRadius: 3,
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
   },
   itemText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 15,
   },
   itemIcon: {
      position: 'absolute',
      top: 10,
      right: 0,
   },
   textBlock: {
      marginTop: 10,
   },
   text: {
      fontFamily: 'HindSiliguri-Regular',
      color: COLOR.MEDIUMGRAY,
   },
   imageBlock: {
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLOR.BLUEGRAY,
      borderRadius: 3,
   },
   image: {
      width: 200,
      height: 100,
   },
   developerImgContainer: {
      width: 32,
      height: 32,
      flex: 1,
   },
   developerImg: {
      width: 32,
      height: 32,
      borderRadius: 3,
   },
   developerText: {
      flex: 4,
      textAlign: 'right',
      fontFamily: 'HindSiliguri-Regular',
   },
});
