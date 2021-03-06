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
import NewsStyle from "./NewsItem";
import Tags from "./Tags";
import MapsStyle from "./Maps";
import Buttons from "./Buttons";
import FilterStyles from './Filter';
import SettingsStyles from './Settings';
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
      justifyContent: 'center',
   },
   p: {
      fontSize: 16,
      lineHeight:24,
      marginBottom:20,
      fontFamily: 'HindSiliguri-Regular',
      color:COLOR.DARKPURPLE
   },
   h1: {
      fontSize:22,
      fontFamily:'Muli-ExtraBold',
      marginBottom:16,
      color:COLOR.DARKPURPLE
   },
   h2: {
      fontSize:16,
      fontFamily:'Muli-ExtraBold',
      marginBottom:8,
      color:COLOR.DARKPURPLE
   },
   h3: {
      fontSize:18,
      fontFamily:'Muli-Bold',
      color:COLOR.DARKPURPLE,
      marginBottom:10,
   },
   h4: {
      fontSize: 16,
      fontFamily: 'Muli-ExtraBold',
      color: COLOR.GRAYBROWN,
   },
   img: {
      resizeMode: React.Image.resizeMode.cover,
   },
   bold: {
      fontWeight:'bold',
   },
   itemContent: {
      lineHeight: 25,
   },
   backgroundStandard: {
      backgroundColor: COLOR.PALEGRAY,
   },
   grayBorderTop: {
      borderTopColor: COLOR.GRAY,
   },
   subTitle: {
      fontFamily: 'Muli-Regular',
      fontSize: 13,
   },
   boldText: {
      fontFamily: 'Muli-ExtraBold',
   },
   redText: {
      color: COLOR.RED,
   },
   blueText: {
      color: COLOR.BLUE,
   },
   grayText: {
      color: COLOR.MEDIUMGRAY,
   },
   centerText: {
      textAlign: 'center',
   },
   rightText: {
      textAlign: 'right',
   },
   leftText: {
      textAlign: 'left',
   },
   generalPadding: {
      padding: 15,
   },
   linkText: {
      color: COLOR.MEDIUMGRAY,
      textDecorationLine: 'underline',
      lineHeight: 20,
      marginBottom: 15,
      fontSize: 12,
   }
});

export { General, MenuStyle, ListViewStyle, EventStyle, NewsStyle, ComponentStyle, Tags, FilterStyles, Buttons, MapsStyle, SettingsStyles };
