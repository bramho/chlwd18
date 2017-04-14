/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet, Dimensions, PixelRatio, Platform} from "react-native";
/**
 * Importing other styles from stylesheets
 */
import Colors from "./Colors";
import MenuStyle from "./Menu";
import ListViewStyle from "./Listview";
import EventStyle from "./EventItem";
import {SearchBar} from "./Components";

const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

const General = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   p: {
      fontSize:16,
      marginBottom:20
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
      fontSize:36,
      color:"#000"
   },
   subTitle: {
      fontSize: 24,
   },
   bold: {
      fontWeight:'bold',
   },
   navBar: {
      height: 56,
      padding:20,
      justifyContent:'center',
      ...Platform.select({
         ios: {
            paddingLeft: 5,
         }
      }),
   },
   textContainer: {
      padding:20
   }
});

export { General, Colors, MenuStyle, ListViewStyle, EventStyle, ComponentStyle };
