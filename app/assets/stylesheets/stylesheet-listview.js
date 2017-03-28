/**
 * This stylesheet holds all styles for rows and ListViews
 */
import {StyleSheet} from "react-native";

 export default ListViewStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#F5FCFF",
      paddingTop:10,
   },
   row: {
      flex: 1,
      marginLeft:10,
      marginRight:10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:"#ccc"
   },
   body: {
     padding:15,
     flex:1
   },
   title: {
      fontSize:20,
      flex:4,
   },
   title_price: {
      flex: 1,
      flexDirection: 'row',

   },
   price: {
      fontSize:12,
      right:0,
      backgroundColor:"#333",
      padding:5,
      height:28,
      color:"#fff"
   },
   text: {
      fontSize: 16,
   },
   photo: {
      height: 100,
      width: 100,
   },
   separator: {
      flex: 1,
      height: 10,
   },
 });
