/**
 * This stylesheets holds all styles for (small) components
 */
import {StyleSheet, Platform} from "react-native";
COLOR = require('./COLOR');

export default ComponentStyle = StyleSheet.create({
   headerContainer: {
      padding: 8,
      paddingLeft: 20,
      paddingRight: 20,
      height: 80,
      top:0,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLOR.PEALGRAY,
      ...Platform.select({
         ios: {
            paddingTop: 25
         },
         android: {
            paddingTop: 40,
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
      height: 50,
      width: 50,

   },
   filterIcon: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      alignItems: 'center',
      borderRadius: 50,
      justifyContent: 'center',
   },
   shareIconContainer: {
      flex: 1,
      height: 50,
      width: 50,

   },
   shareIcon: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      alignItems: 'center',
      borderRadius: 50,
      justifyContent: 'center',
   },

   headerTitleContainer: {
      flex: 5,
   },
   headerTitle: {
      fontSize: 16,
      color: COLOR.GRAYBROWN,
      fontFamily: 'Muli-ExtraBold',
   },
   tabelRow: {
      flexDirection: 'row',
   },
   tabelCellOne: {
      flex: 1,
   },
   tabelCellTwo: {
      flex: 2,
   },
   tabelCellThree: {
      flex: 3,
   },

});
