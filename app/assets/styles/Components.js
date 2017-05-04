/**
 * This stylesheets holds all styles for (small) components
 */
import {StyleSheet, Platform} from "react-native";
COLOR = require('./COLOR');

export default ComponentStyle = StyleSheet.create({
   searchBarContainer: {
      padding: 8,
      height: 80,
      top:0,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLOR.WHITE,
      ...Platform.select({
         ios: {
            paddingTop: 25
         }
      }),
      borderBottomWidth: 1,
      borderColor: COLOR.DARKWHITE,
   },
   searchBarInput: {
      flex:5,
      fontSize: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      backgroundColor: COLOR.WHITE,
      ...Platform.select({
         ios: {
            paddingLeft: 5,
         }
      }),
      paddingLeft: 30,
   },
   filterIconContainer: {
      flex: 1,
      marginLeft: 15,
      height: 50,


   },
   filterIcon: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      alignItems: 'center',
      borderRadius: 50,
      justifyContent: 'center',
   }
});
