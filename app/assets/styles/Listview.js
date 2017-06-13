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
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:"#fff",
      borderRadius: 5,
      marginVertical:10
   },
   body: {
     paddingRight: 20,
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft:20,
     flex:2,
     flexDirection: 'column',
     alignItems:'flex-start'
   },
   dateContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: 10,
      paddingLeft: 0,
   },
   title: {
      color:  COLOR.DARKPURPLE,
      lineHeight:21,
   },
   titleContainer: {
      flex: 1,
      flexDirection: 'row',
   },
   description: {
      color: COLOR.BLUE,
      fontSize: 14,
      marginTop:-4,
      marginBottom:10,
      fontWeight: "500",
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
      flexDirection:'row'
   },
   categoryItemContainer: {
      marginRight: 10,
      paddingHorizontal:20,
      height:24,
      borderRadius: 16,
      borderWidth:StyleSheet.hairlineWidth,
      borderColor:COLOR.GRAY
   },
   categoryItem: {
      fontSize: 12,
      fontFamily: 'Muli-Regular',
      lineHeight:19
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
      height:100,
      width: 120,
      borderRadius: 5,
      resizeMode: 'cover',
   },
   picture: {
      flex:1
   },
   separator: {
      height:StyleSheet.hairlineWidth,
      backgroundColor:COLOR.GRAY
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
   sectionHeader:{
      paddingHorizontal:20,
      paddingVertical:15,
      borderTopWidth:StyleSheet.hairlineWidth,
      borderTopColor:COLOR.GRAY
   },
   sectionHeaderEvents: {
      backgroundColor:COLOR.WHITE
   },
   sectionHeaderText: {
      fontSize: 16,
      fontWeight: "bold",
      color:COLOR.DARKPURPLE,
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
