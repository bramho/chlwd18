/**
 * This stylesheet holds all the menu styles
 */
import {StyleSheet} from "react-native";
COLOR = require('./COLOR');

export default MenuStyle = StyleSheet.create({
   basicMenuStyles: {
      height: 60,
      borderTopWidth: 1,
   },
   sceneContainer: {
      marginTop:60,
      marginBottom:60
   },
   transparentNavbar: {
      backgroundColor:'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      borderBottomWidth: 0,
   }
});
