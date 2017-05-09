/**
 * This stylesheet holds all the menu styles
 */
import {StyleSheet} from "react-native";
COLOR = require('./COLOR');

export default MenuStyle = StyleSheet.create({
   basicMenuStyles: {
      height: 60,
      borderTopWidth: 1,
      backgroundColor: COLOR.WHITE,
   },
   sceneContainer: {
      marginTop:60,
      marginBottom:60
   },
   transparentNavbar: {
      backgroundColor:'transparent',
      height: 80,
      paddingTop: 5,
      borderWidth: 0,
      borderColor: 'transparent',
      borderBottomColor: COLOR.WHITE24,
      borderBottomWidth: StyleSheet.hairlineWidth,
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
