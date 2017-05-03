/**
 * This stylesheets holds all styles for (small) components
 */
import {StyleSheet, Platform} from "react-native";
COLOR = require('./COLOR');

export default ComponentStyle = StyleSheet.create({
   searchBarContainer: {
      padding: 8,
      height: 64,
      top:0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C1C1C1',
      ...Platform.select({
         ios: {
            paddingTop: 25
         }
      }),
   },
   searchBarInput: {
      flex:1,
      fontSize: 15,
      backgroundColor: COLOR.WHITE,
      borderRadius: 2,
      ...Platform.select({
         ios: {
            paddingLeft: 5,
         }
      }),
   },
});
