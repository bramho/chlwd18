/**
 * This stylesheets holds all styles for (small) components
 */
import {StyleSheet, Platform} from "react-native";
COLOR = require('./COLOR');

export default ComponentStyle = StyleSheet.create({
   headerContainer: {
      padding: 8,
      paddingLeft: 20,
      paddingRight: 20,
      height: 60,
      top:0,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLOR.HEADERBLACK,
      ...Platform.select({
         ios: {
            paddingTop: 25
         },
         android: {
            height:80,
            paddingTop: 20,
            paddingBottom:0
         }
      }),
   },
   singleHeaderContainer: {
      padding: 8,
      paddingLeft: 20,
      paddingRight: 20,
      height: 60,
      top:0,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      ...Platform.select({
         ios: {
            paddingTop: 30
         },
         android: {
            height:80,
            paddingTop: 20,
            paddingBottom:0
         }
      }),
      zIndex: 999,
   },
   transparentHeader: {
      position:'absolute',
      left:0,
      right:0,
   },
   searchBarInput: {
      flex:5,
      fontSize: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      backgroundColor: COLOR.WHITE,
      ...Platform.select({
         ios: {
            paddingLeft: 5,
         }
      }),
      paddingLeft: 30,

   },
   filterIconContainer: {
      flex: 1,
      height: 50,
      width: 50,
      padding:0,
   },
   singleFilterIconContainer: {
      marginLeft: 10,
   },
   filterIcon: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      padding:0
   },
   filterModalIcon: {
      borderColor: COLOR.RED,
   },
   shareIconContainer: {
      flex: 1,
      height: 50,
      width: 50,

   },
   shareIcon: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: COLOR.WHITE,
      alignItems: 'center',
      borderRadius: 50,
      justifyContent: 'center',
   },
   headerTitleContainer: {
      flex: 5,
   },
   newsHeaderTitleContainer: {
      flex: 3,
      alignItems: 'center',
   },
   backIconContainer: {
      flex: 4
   },
   headerTitle: {
      fontSize: 18,
      color: COLOR.WHITE,
      fontFamily: 'Muli-ExtraBold',
      textAlign: 'center',
   },
   tabelRow: {
      flexDirection: 'row',
   },
   tabelCellOne: {
      flex: 1,
   },
   tabelCellTwo: {
      flex: 2,
   },
   tabelCellThree: {
      flex: 3,
   },
   loadingIconContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30,
   },
   newsHeader: {
      backgroundColor: COLOR.GRAYBLUE,
   },
   onBoardingSlide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.WHITE,
      paddingLeft: 25,
      paddingRight: 25,
   },
   onBoardingPagination: {
      paddingBottom: 175,
   },
   onBoardingImage: {
      position: 'absolute',
      top: 80,
   },
   onBoardingText: {
      fontFamily: 'Muli-Regular',
      fontSize: 16,
      color: COLOR.DARK,
   },
   onBoardingSubText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 12,
      lineHeight: 22,
      color: COLOR.MEDIUMGRAY,
      textAlign: 'center',
      marginTop: 8,
   },
   onBoardingBtn: {
      padding: 10,
      minWidth: 220,
      backgroundColor: COLOR.RED,
      borderRadius: 8,
      position: 'absolute',
      bottom: 65,
   },
   onBoardingBtnText: {
      fontFamily: 'Muli-Regular',
      fontSize: 14,
      color: COLOR.WHITE,
      textAlign: 'center',
   },
   skipTextContainer: {
      position: 'absolute',
      bottom: 24,
   },
   skipText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 12,
      color: COLOR.BLACK40,
      textDecorationLine: 'underline',
   }
});
