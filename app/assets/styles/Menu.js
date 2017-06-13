/**
 * This stylesheet holds all the menu styles
 */
import {StyleSheet,Platform} from "react-native";
COLOR = require('./COLOR');

export default MenuStyle = StyleSheet.create({
   tabBar: {
      height: 50,
      borderTopWidth: 1,
      borderColor: COLOR.LIGHTBLUE,
      backgroundColor: COLOR.WHITE,
   },
   transparentNavbar: {
      height: 60,
      paddingTop: 5,
      borderWidth: 0,
      borderColor: 'transparent',
      ...Platform.select({
         android: {
            height: 80,
         }
      }),
   },
   menuItemText: {
      fontSize: 11,
      fontFamily: 'Muli-Regular'
   },
   tabbarItemContainer: {
      alignItems: 'center',
   },
   backButtonTextStyle: {
      color: COLOR.WHITE,
      fontFamily: 'Muli-Regular',
      fontSize: 15,
      marginLeft: 10,
   },
   newsBackButtonTextStyle: {
      color: COLOR.RED,
      fontFamily: 'Muli-Regular',
      fontSize: 15,
      marginLeft: 10,
   },
   backButtonIconStyle: {
      tintColor: COLOR.WHITE,
   },
   newsBackButtonIconStyle: {
      tintColor: COLOR.RED,
   },
   newsNavbar: {
      backgroundColor: COLOR.WHITE,
      height: 80,
      paddingTop: 5,
   },

});
