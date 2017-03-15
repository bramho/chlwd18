import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default class Main extends Component {
   constructor(props) {
      super(props);
   }

   render() {
     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>
           Welcome to the chlwd18 app!
         </Text>
       </View>
     );
   }
}
