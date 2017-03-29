/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
/**
 * Importing other styles from stylesheets
 */
import Colors from "./stylesheet-colors";
import Menu from "./stylesheet-menu";
import ListViewStyle from "./stylesheet-listview";
import ComponentStyles from "./stylesheet-components";

const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

const Basic = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      marginTop:60,
      marginBottom:60
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
   },
   title: {
      marginLeft: 30,
   },
   subTitle: {
      fontSize: 40,
   },
   bold: {
      fontWeight:'bold',
   }
});

export { Basic, Colors, Menu, ListViewStyle, ComponentStyles };
