/**
 * This stylesheets holds all colors
 */
import {StyleSheet} from "react-native";

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
      //backgroundColor: '#03A9F4',
      overflow: 'hidden',
      height:HEADER_MAX_HEIGHT,
   },
   headerContent : {
      padding:20,
      marginTop: 40
   },
   headerText : {
      color:'#fff'
   },
   scrollViewContent: {
      marginTop: HEADER_MAX_HEIGHT,
      backgroundColor:'#fff',
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
      color:"#fff"
   }
});
