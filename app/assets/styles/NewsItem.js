/**
 * This stylesheets holds all colors
 */
import {StyleSheet, Dimensions} from "react-native";
COLOR = require('./COLOR');

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

export default NewsStyle = StyleSheet.create({
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
      backgroundColor:COLOR.WHITE,
      paddingBottom: 60,
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
   articleInfo: {
      flexDirection: 'row',
   },
   articleInfoText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 14,
   },
   category: {
      fontFamily: 'Muli-Bold',
      color: COLOR.GRAYBLUE,
      marginTop: 1,
   },
   imageContainer: {

   },
   image: {
      height:(100*vw)/2,
      width: 100*vw,
   },
   inlineImage: {
      height:(100*vw-30)/2,
      width: 100*vw-30,
   },
   imageDescription: {
      height: 40,
      lineHeight: 40,
      backgroundColor: COLOR.GRAYBLUE,
      color: COLOR.WHITE,
      fontFamily: 'HindSiliguri-Regular',
      paddingLeft: 20
   },
   contentText: {
      color: COLOR.GRAYBROWN,
   },
   quoteContainer: {
      backgroundColor: COLOR.DARKWHITE,
      padding: 15,
      borderLeftWidth: 1,
      borderLeftColor: COLOR.GRAYBLUE,
   },
   quoteText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 18,
      color: COLOR.GRAYBLUE,
   },
});
