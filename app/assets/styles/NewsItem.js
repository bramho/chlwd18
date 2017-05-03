/**
 * This stylesheets holds all colors
 */
import {StyleSheet} from "react-native";
COLOR = require('./COLOR');

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default EventItem = StyleSheet.create({
   fill: {
      flex: 1,
   },
   row: {
      height: 40,
      margin: 16,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center',
   },
   header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      height:HEADER_MAX_HEIGHT,
   },
   headerContent : {
      padding:20,
      paddingTop: 60,
      marginTop: 40
   },
   headerText : {
      color:'#fff',
      backgroundColor: 'transparent',
   },
   scrollViewContent: {
      marginTop: HEADER_MAX_HEIGHT,
      backgroundColor:COLOR.WHITE,
   },
   backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: null,
      height: HEADER_MAX_HEIGHT,
      resizeMode: 'cover',
   },
   button: {
      color:"#fff",
      position:'relative',
      zIndex: 2
   }
});