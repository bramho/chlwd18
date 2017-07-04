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
     alignItems: 'center',
     overflow:'hidden',
     position: 'relative',
     top:-60,

   },
   buttonMultiple: {
       width: 1*vw-40,
       marginHorizontal: 20,
       paddingHorizontal:40,
       left:-20
   },
   buttonContent: {
      position: 'relative',
      ...StyleSheet.absoluteFillObject,
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
     zIndex: 999,
     overflow:'hidden',
   },
   buttonScrollview: {
      maxHeight:.5*vw+20,
   },
   buttonScrollviewContainer: {
      paddingHorizontal:20
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
   tag: {
      backgroundColor: COLOR.BLUEGRAY,
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
