/**
 * This stylesheets holds all colors
 */
import {StyleSheet,Dimensions} from "react-native";
COLOR = require('./COLOR');

const {width, height, scale} = Dimensions.get("window"),
     vw = width,
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
   innerContainer: {
      flex: 1,
      position: 'relative'
   },
   header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      backgroundColor:COLOR.HEADERGRAY,
   },
   headerContent : {
      padding:20,
      paddingTop: 60,
      marginTop: 40,
      height:HEADER_MAX_HEIGHT-60
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
   },
   section: {
      borderBottomWidth: 1,
      borderColor: COLOR.GRAY,
      padding: 20,
   },
   dateTimeTextContainer: {
      backgroundColor: 'transparent',
   },
   dotSeperatorContainer: {
      marginLeft: 5,
      marginRight: 5,
      justifyContent: 'center'
   },
   dotSeperator: {
      fontSize: 8,
   },
   headerCityText: {
      fontFamily: 'Muli-Bold',
   },
   title: {
      marginBottom: 3
   },
   bottomHeaderContent: {
      position: 'absolute',
      bottom: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10,
   },
   priceContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
   },
   innerPriceContainer: {
      backgroundColor: COLOR.BLUE,
      borderRadius: 5,
   },
   price: {
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 12,
      paddingRight: 12,
      fontSize: 14,
      fontWeight: 'bold',
   },
   bottomHeaderTicket: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 15,
   },
   headerTicketLink: {
      textAlign: 'left',
      alignSelf: 'stretch'
   },
   dateAndTimes: {
      marginTop: 20,
   },
   buyTicketsButton: {
      backgroundColor: COLOR.RED,
      alignSelf: 'center',
      width: 220,
      marginTop: 30,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 30,
   },
   buyTicketsButtonText: {
      color: COLOR.WHITE,
      textAlign: 'center',
   },
   favoriteButtonHolder: {
      width: 50,
      height: 50,
      backgroundColor: COLOR.WHITE,
      position: 'absolute',
      top: -25,
      right: 15,
      borderRadius: 25,
      zIndex: 999,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
         width: 1,
         height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
   },
   favoriteButtonContainer: {
      position: 'absolute',
      top: 68,
      right: 10,
   },
   favoriteButton: {
      backgroundColor: 'transparent',
      color: COLOR.WHITE,
   },
   carouselContainer: {
      minHeight: 200,
      alignItems: 'center',
   },
   barHolder: {
      position: 'absolute',
      zIndex: 2,
      top: 30,
      flexDirection: 'row',
   },
   barContainer: {
      backgroundColor: '#ccc',
      overflow: 'hidden',
      height: 3,
   },
   barOverlay: {
      backgroundColor: COLOR.RED,
      height: 3,
      position: 'absolute',
      left: 0,
      top: 0,
   },
});
