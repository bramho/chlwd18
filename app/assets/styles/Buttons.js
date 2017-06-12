/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet} from "react-native";

COLOR = require('./COLOR');

export default Buttons = StyleSheet.create({
   buttonContainer: {
      alignSelf: 'center',
      width: 220,
      marginTop: 30,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 30,
   },
   buttonText: {
      color: COLOR.WHITE,
      textAlign: 'center',
   },
   buttonRed: {
      backgroundColor: COLOR.RED,
   }
});
