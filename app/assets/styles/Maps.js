/**
 * This stylesheets holds all colors
 */
import {StyleSheet,Dimensions,Animated} from "react-native";
COLOR = require('./COLOR');

const {width, height, scale} = Dimensions.get("window"),
     vw = width,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

export default Maps = StyleSheet.create({
   map: {
     ...StyleSheet.absoluteFillObject,
   },
   container: {
     ...StyleSheet.absoluteFillObject,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   button: {
     width: 1*vw-40,
     height: .5*vw+20,
     paddingHorizontal: 20,
     alignItems: 'center',
     marginHorizontal: 10,
     overflow:'hidden',
     position: 'relative',
     top:-80,
   },
   buttonContent: {
      position: 'relative',
      width: 1*vw-40,
      height: .5*vw-60,
      borderRadius: 6,
      overflow:'hidden',
      top:80,
      paddingHorizontal: 20,
      paddingVertical: 20,
   },
   buttonContainer: {
     flexDirection: 'row',
     marginVertical: 20,
     backgroundColor: 'transparent',
     position: 'relative',
   },
   buttonPhoto: {
      ...StyleSheet.absoluteFillObject,
     position:'absolute',
     top:0,
     right:0,
     left:0,
     bottom:0,
     resizeMode: 'cover',
     borderRadius: 6,
   },
   buttonText: {
      color:COLOR.WHITE
   },
   overlay: {
      position: 'absolute',
      top:0,
      left: 0,
      right: 0,
      bottom:0,
      backgroundColor:COLOR.BLACK20,
      borderRadius: 6,
   },
});