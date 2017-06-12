/**
 * This stylesheet holds all styles for rows and ListViews
 */
import {StyleSheet, Dimensions} from "react-native";
COLOR = require('./COLOR');

const {width, height, scale} = Dimensions.get("window"),
     vw = width / 100,
     vh = height / 100,
     vmin = Math.min(vw, vh),
     vmax = Math.max(vw, vh);

 export default ListView = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop:0,
      marginBottom:50
   },
   row: {
      flex: 1,
      marginLeft:20,
      marginRight:20,
      marginTop:20,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor:"#fff",
      borderRadius: 5,
   },
   body: {
     paddingRight: 20,
     paddingTop: 10,
     paddingBottom: 10,
     flex:1,
     flexDirection: 'row',
   },

   dateContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: 10,
      paddingLeft: 0,
   },
   dayText: {
      fontSize: 16,
      color: COLOR.DARKPURPLE,
      fontFamily: 'Muli-Regular',
   },

   monthText: {
      color: 'rgb(178, 178, 178)',
      fontSize: 14,
      fontFamily: 'Muli-Regular',
   },

   textContainer: {
      flex: 5,
   },

   title: {
      fontSize:16,
      flex:4,
      color: '#000',
      fontFamily: 'Muli-Regular',
   },
   titleContainer: {
      flex: 1,
      flexDirection: 'row',
   },
   description: {
      color: 'rgb(178, 178, 178)',
      fontSize: 14,
      fontFamily: 'Muli-Regular',
   },
   priceContainer: {
      position: 'absolute',
      // flex: 1,
      width: 100*vw-20,
      alignItems: 'flex-start',
      paddingTop: 7,
      paddingLeft: 7,
   },
   price: {
      right:0,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor:"#fff",
      height:28,
      borderRadius: 5,
   },
   priceText: {
      fontSize: 12,
      color:"#000",
      fontFamily: 'Muli-Regular',
   },

   addToFavoritesContainer: {
      position: 'absolute',
      top: 10,
      right: 5,
      backgroundColor: 'transparent',
   },

   categoriesContainer: {
      position: 'absolute',
      bottom: 10,
      left: 15,
      flex: 1,
      flexDirection: 'row',
   },
   categoryItemContainer: {
      marginRight: 10,
      padding: 3,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 5,
   },
   categoryItem: {
      fontSize: 12,
      color: '#fff',
      fontFamily: 'Muli-Regular',
   },
   categoryItemDance: {
      backgroundColor: 'rgb(77, 76, 193)',
   },
   categoryItemCultuur: {
      backgroundColor: 'rgb(161, 50, 145)',
   },

   text: {
      fontSize: 16,
   },
   photo: {
      height:(100*vw-40)/2,
      width: 100*vw-40,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderRadius: 5,
   },
   separator: {
      flex: 1,
      height: 0,
   },
   footer: {
      flex: 1,
      height: 10,
   },

   listViewTitleContainer: {
      marginLeft: 20,
      marginTop: 20,
   },
   listViewTitle: {
      color: COLOR.RED,
      fontFamily: 'Muli-Bold',
      fontSize: 16,
   },

   newsBody: {
      backgroundColor: COLOR.GRAYBLUE,
   },
   newsTitle: {
      color: COLOR.WHITE,
      fontSize: 16,
      fontFamily: 'Muli-Regular',
      lineHeight: 22,
   },
   newsDateContainer: {
      marginTop: 2,
   },
   newsMonth: {
      fontFamily: 'Muli-ExtraBold',
      color: COLOR.DARKPURPLE,
   },
   newsDay: {
      fontFamily: 'Muli-ExtraBold',
      color: COLOR.DARKPURPLE,
      fontSize: 19,
   },
   readLenghtContainer: {
      position: 'absolute',
      top: 5,
      right: 10,
   },
   readLengthText: {
      color: COLOR.WHITE,
      backgroundColor: 'transparent',
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 14,
   },
 });
