/**
 * This is a general stylesheet for common styles and variables
 */
import React, {StyleSheet, Dimensions, PixelRatio, Platform} from "react-native";
/**
 * Importing other styles from stylesheets
 */
import MenuStyle from "./Menu";
import ListViewStyle from "./Listview";
import EventStyle from "./EventItem";
import NewsStyle from "./EventItem";
import {SearchBar} from "./Components";

COLOR = require('./COLOR');
const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

const General = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center'
   },
   p: {
      fontSize:12,
      lineHeight:21,
      marginBottom:20,
      color:COLOR.DARKPURPLE
   },
   h1: {
      fontSize:18,
      fontWeight:'bold',
      marginBottom:16,
      color:COLOR.DARKPURPLE
   },
   h2: {
      fontSize:16,
      fontWeight:'bold',
      marginBottom:8,
      color:COLOR.DARKPURPLE
   },
   h3: {
      fontSize:14,
      fontWeight:'bold',
      color:COLOR.DARKPURPLE
   },
   img: {
      resizeMode: React.Image.resizeMode.cover,
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
   },
   backgroundStandard: {
      backgroundColor: COLOR.PALEGRAY,
   },
   grayBackground: {
      backgroundColor: '#ccc',
   },
   grayBorderTop: {
      borderTopColor: "#666666",
   }
});

export { General, MenuStyle, ListViewStyle, EventStyle, NewsStyle, ComponentStyle };
