import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput} from 'react-native';
import { Scene,Actions } from 'react-native-router-flux';

import SearchBarComponent from '../components/SearchBar';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';

import { General, ListViewStyle, ComponentStyle } from '../assets/styles/General';

import EventsNavbar from '../components/NavBar';
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
         searchText: ''
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

   /**
    * Gets user input and sets dataSource to returned search results
    * @param {Event} event    User input/search query
    */
   setSearchText(event) {
      let searchText = event.nativeEvent.text;
      let filteredData = filterData(searchText, this.state.apiData, 'events');

      this.setState({
         searchText,
         dataSource: this.state.dataSource.cloneWithRows(filteredData),
      });
   }

   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    */
   _renderRow (rowData) {
      return (
         <View style={ListViewStyle.row}>
            <Image source={{ uri: rowData.thumbnail}} style={ListViewStyle.photo} />
            <View style={ListViewStyle.body}>
               <View style={ListViewStyle.title_price}>
                  <Text style={ListViewStyle.title}>
                    {rowData.title}
                  </Text>
                  <Text style={ListViewStyle.price}>
                    {rowData.ticket_prices.adult}
                  </Text>
               </View>
               <Text numberOfLines={2} style={ListViewStyle.description}>
                 {rowData.summary}
               </Text>
            </View>

         </View>
      )
   }
   render() {
      return (
         <View style={General.container}>
            <View style={ComponentStyle.searchBarContainer}>
               <TextInput
                  style={ComponentStyle.searchBarInput}
                  placeholder={getTranslation('searchTerm')}
                  onChange={this.setSearchText.bind(this)}
               />
            </View>
            <ListView
               style={ListViewStyle.container}
               dataSource={this.state.dataSource}
               renderRow={this._renderRow}
               renderSeparator={(sectionID, rowID) =>
                 <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
               }
               renderFooter={() =><View style={ListViewStyle.footer} />}
            />
         </View>
      )
   }
}
