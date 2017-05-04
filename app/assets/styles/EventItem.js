/**
 * This stylesheets holds all colors
 */
import {StyleSheet,Dimensions} from "react-native";
COLOR = require('./COLOR');

const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

const HEADER_MAX_HEIGHT = 60*vh;
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
   },
   overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom:0,
      backgroundColor:COLOR.BLACK40,
   }
});
