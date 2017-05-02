import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, getStorageData, checkStorageKey, removeItemFromStorage } from '../helpers/Storage';

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
var listData = [];

export default class EventsList extends Component {
   constructor(props) {
      super(props);
      var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      this.state = {
         dataSource: dataSource.cloneWithRows(listData),
         isLoading:true,
         rawData: '',
         apiData: '',
         searchText: '',
         myKey: '',
         refreshing: false,
      };


   }

   componentDidMount() {
      this.fetchData();
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData = async () => {

      var storageKey = 'eventList';

      removeItemFromStorage(storageKey);

      await checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data);

               this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(storageData),
                  apiData: storageData,
                  isLoading: false,
                  empty: false,
                  rawData: storageData,
               });
            });
         } else {
            Api.getData(apiLink)
               .then((data) => {
                  listData = data;
                  this.setState({
                     dataSource: this.state.dataSource.cloneWithRows(data),
                     apiData: data,
                     isLoading: false,
                     empty: false,
                     rawData: data,
                  });

                  console.log(listData);
                  setStorageData(storageKey, listData);


               })
               .catch((error) => {
                  console.log(error)
                  this.setState({
                     empty: true,
                     isLoading: false,
                  });
               });
         }
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

   onItemPress(id) {
      console.log('You Pressed');
      Actions.eventItem({eventId:id})
   }

   _onRefresh() {
      this.setState({refreshing: true});

      this.fetchData().then(() => {
         this.setState({refreshing: false})
      });

   }

   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    */
   _renderRow (rowData) {
      return (
         <TouchableOpacity onPress={function(){this.onItemPress(rowData.id)}.bind(this)}>
         <View style={ListViewStyle.row}>
            <View>
               <Image source={{ uri: rowData.thumbnail}} style={ListViewStyle.photo} />
               <View style={ListViewStyle.priceContainer}>
                  <View style={ListViewStyle.price}>
                     <Text style={ListViewStyle.priceText}>
                        {rowData.ticket_prices.adult}
                     </Text>
                  </View>
               </View>
               <View style={ListViewStyle.categoriesContainer}>
                  <View style={[ListViewStyle.categoryItemContainer, ListViewStyle.categoryItemDance]}>
                     <Text style={ListViewStyle.categoryItem}>
                        Dance
                     </Text>
                  </View>

                  <View style={[ListViewStyle.categoryItemContainer, ListViewStyle.categoryItemCultuur]}>
                     <Text style={ListViewStyle.categoryItem}>
                        Cultuur
                     </Text>
                  </View>
               </View>
            </View>
            <View style={ListViewStyle.body}>
               <View style={ListViewStyle.dateContainer}>
                  <View style={ListViewStyle.day}>
                     <Text style={ListViewStyle.dayText}>
                       {formatDate(rowData.dateStart,'eventItem-day')}
                     </Text>
                  </View>
                  <View style={ListViewStyle.month}>
                     <Text style={ListViewStyle.monthText}>
                       {formatDate(rowData.dateStart,'eventItem-month')}
                     </Text>
                  </View>
               </View>
               <View style={ListViewStyle.textContainer}>
                  <View style={ListViewStyle.titleContainer}>
                     <Text style={ListViewStyle.title}>
                       {rowData.title}
                     </Text>
                  </View>
                  <Text numberOfLines={2} style={ListViewStyle.description}>
                    {rowData.title}
                  </Text>
               </View>
            </View>
         </View>
         </TouchableOpacity>
      )
   }
   render() {
      var currentView = (this.state.isLoading) ? <View style={{flex:1, backgroundColor: '#dddddd'}}><Text>Loading..</Text></View> :
      <ListView
         style={ListViewStyle.container}
         dataSource={this.state.dataSource}
         renderRow={this._renderRow.bind(this)}
         renderSeparator={(sectionID, rowID) =>
           <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
         }
         renderFooter={() =><View style={ListViewStyle.footer} />}
         enableEmptySections={true}
         refreshControl={
            <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this._onRefresh.bind(this)}
            />
         }
      />
      return (
         <View style={General.container}>
            <View style={ComponentStyle.searchBarContainer}>
               <TextInput
                  style={ComponentStyle.searchBarInput}
                  placeholder={getTranslation('searchTerm')}
                  onChange={this.setSearchText.bind(this)}
               />
            </View>
            {currentView}
         </View>
      )
   }
}
