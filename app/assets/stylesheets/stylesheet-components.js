/**
 * This stylesheets holds all styles for (small) components
 */
import {StyleSheet} from "react-native";

export default ComponentStyles = StyleSheet.create({
   searchBarContainer: {
      flex: 1,
      padding: 8,
      paddingTop: 20,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C1C1C1',
   },
   searchBarInput: {
      height: 40,
      flex: 1,
      paddingHorizontal: 8,
      fontSize: 15,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
   },
});
