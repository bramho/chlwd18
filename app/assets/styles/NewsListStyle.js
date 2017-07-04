/**
 * This stylesheet holds all styles for rows and ListViews
 */
import {StyleSheet, Dimensions} from "react-native";
COLOR = require('./COLOR');

const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

 export default ListView = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF",
      paddingTop:0,
      marginBottom:60
   },
   row: {
      flex: 1,
      marginLeft:10,
      marginRight:10,
      marginTop:10,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor:"#E81097",
      borderRadius: 5,
   },
   body: {
     paddingLeft:20,
     paddingRight: 20,
     paddingTop: 10,
     paddingBottom: 10,
     flex:1,
     flexDirection: 'row',
   },

   dateContainer: {
      flex: 1,
      flexDirection: 'column',
   },
   month: {

   },

   textContainer: {
      flex: 5,
   },

   title: {
      fontSize:20,
      flex:4,
      color: '#fff',
   },
   titleContainer: {
      flex: 1,
      flexDirection: 'row',
   },
   description: {
      color: '#fff',
   },
   priceContainer: {
      position: 'absolute',
      // flex: 1,
      width: 100*vw-20,
      alignItems: 'flex-start',
      paddingTop: 5,
      paddingLeft: 5,
   },
   price: {
      right:0,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor:"#fff",
      height:28,
      borderRadius: 5,
   },
   priceText: {
      fontSize: 12,
      color:COLOR.DARKPURPLE,
   },
   text: {
      fontSize: 16,
   },
   photo: {
      height:150,
      width: 100*vw-20,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderRadius: 5,
   },
   separator: {
      flex: 1,
      height: 0,
   },
   footer: {
      flex: 1,
      height: 10,
   },
 });
