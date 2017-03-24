/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

export default Basic = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
   },
   h1: {
      fontSize:32,
   },
   h2: {
      fontSize:18,
   },
   h3: {
      fontSize:16,
   },
   img: {
      resizeMode: React.Image.resizeMode.cover,

   }
});
