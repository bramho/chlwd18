import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput} from 'react-native';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';

import { General, ListViewStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://eric-project.c4x.nl/api/events";

/**
 * New initialisation of the ListView datasource object
 */
const ds = new ListView.DataSource({
   rowHasChanged: (row1, row2) => row1 !== row2,
});

export default class EventsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dataSource: ds,
         rawData: '',
         apiData: '',
      };

   }

   componentDidMount() {
      this.fetchData();
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData() {
      Api.getData(apiLink)
         .then((data) => {
            this.setState({
               dataSource: ds.cloneWithRows(data),
               apiData: data,
               isLoading: false,
               empty: false,
               rawData: data,
            });
         })
         .catch((error) => {
            console.log(error)
            this.setState({
               empty: true,
               isLoading: false,
            });
         });
   }
   _renderHeader() {
      return(
         <Animated.View style={styles.header}>
           <View style={styles.bar}>
             <Text style={styles.title}>Title</Text>
           </View>
         </Animated.View>
      )
   }
   render() {
      return (
         <View style={General.container}>
            <ScrollView
            style={styles.fill}
            >
            <Text>Hoi</Text>
            </ScrollView>
         </View>
         {{this._renderHeader}}
      )
   }
}
