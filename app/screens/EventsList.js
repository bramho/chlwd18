import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, TouchableHighlight, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import Icon from '../helpers/Icons';

import LoadingIcon from '../components/LoadingIcon';

import { statusBar } from '../helpers/StatusBar';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, getStorageData, checkStorageKey, removeItemFromStorage, setFavorite, setFavoriteIds } from '../helpers/Storage';

import { General, ListViewStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
var params = {
   number: 30,
   pageNumber:2,
   sort:'date',
   from:'',
   until:'',
   category:'',
   location:'',
   minPrice:'',
   maxPrice:'',
}

const apiLink = "https://www.vanplan.nl/viewapi/v1/agenda/lc?apiversion=v1&paper=lc&apitype=agenda&number="+params.number+"&pageNumber="+params.pageNumber+"&sort="+params.sort+"&from="+params.from+"&until="+params.until+"&category="+params.category+"&location="+params.location+"&minprice="+params.minPrice+"&maxprice="+params.maxPrice+"&type=-";

const imgLink = "https://www.vanplan.nl/contentfiles/";

/**
 * New initialisation of the ListView datasource object
 */

var listData = [];

var favorites = [];
var favoritesIds = [];

var favoriteButton;
var categories;

const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

const dataSource = new ListView.DataSource({
   rowHasChanged: (r1, r2) => r1 !== r2,
   sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
});

export default class EventsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dataSource: dataSource.cloneWithRowsAndSections(this.formatData(listData)),
         isLoading:true,
         rawData: '',
         apiData: '',
         searchText: '',
         myKey: '',
         refreshing: false,
         index: 0,
         waiting:false,
         pageNumber:1,
      };


   }

   componentDidMount() {
      this.fetchData();

      this.setFavorites();

      statusBar();
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData = async () => {

      var storageKey = 'eventList';

      removeItemFromStorage('eventList');

      await checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data);

               this.setState({
                  dataSource: dataSource.cloneWithRowsAndSections(this.formatData(listData)),

                  apiData: storageData,
                  // isLoading: false,
                  empty: false,
                  rawData: storageData,
               });
            });
         } else {
            Api.getData(apiLink)
               .then((data) => {
                  listData = data.results;

                  this.setState({
                     dataSource: dataSource.cloneWithRowsAndSections(this.formatData(listData)),
                     apiData: data.results,
                     isLoading: false,
                     empty: false,
                     rawData: data.results,
                  });

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
    * formats the data for the ListView
    * @param  {object} data dataObject from the server
    * @return {object}      [returns formated data object that can be readed by sectionlistview]
    */
   formatData(data) {

      const eventMap = [];

      for (let sectionId = 0; sectionId  < data.length; sectionId++) {
         //console.log(dates.indexOf(data[sectionId].startDate));
         //var datesKey = dates.indexOf(data[sectionId].startDate);
         if(!eventMap[data[sectionId].startDate]) {

            eventMap[data[sectionId].startDate] = [];
         }
         eventMap[data[sectionId].startDate].push(data[sectionId]);

      }
      return eventMap ;
   }

   /**
    * Gets favorites from local storage and assigns them to a favorites variable.
    */
   setFavorites() {
      this.setState({
         isLoading: true
      });
      checkStorageKey('savedEvents').then((isValidKey) => {

         if (isValidKey) {
            getStorageData('savedEvents').then((data) => {
               savedEvents = JSON.parse(data);

               favorites = savedEvents;

               setFavoriteIds(favorites).then((result) => {
                  favoritesIds = result;


                  this.setState({
                     isLoading: false
                  });
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

   onItemPress(id, data) {
      Actions.eventItem({eventId:id, rowData:data})
   }

   _onRefresh() {
      this.setState({refreshing: true});

      this.fetchData().then(() => {
         this.setState({refreshing: false})
      });

   }

   addOrRemoveFavorite (rowData) {

      var index = favoritesIds.indexOf(rowData.id);

      if (index === -1) {
         setFavorite(rowData, true, favoritesIds);
      } else {
         setFavorite(rowData, false, favoritesIds);
      }
   }
   // WIP
   // /**
   //  * When the user scrolled to the end, this function will run.
   //  * @return {[type]} [description]
   //  */
   // onEndReached() {
   //    if (!this.state.waiting) {
   //
   //
   //    }
   }

   _renderSectionHeader(sectionData, date) {
      return (
         <View style={[ListViewStyle.sectionHeader,ListViewStyle.sectionHeaderEvents]}>
            <Text style={ListViewStyle.sectionHeaderText}>{formatDate(date)}</Text>
         </View>
      )
   }
   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    */
   _renderRow (rowData) {
      return (
         <TouchableOpacity onPress={function(){this.onItemPress(rowData.id, rowData)}.bind(this)}>
         <View style={ListViewStyle.row}>
            <View style={ListViewStyle.pic}>
               <Image source={{ uri: imgLink+rowData.image_uri}} style={ListViewStyle.photo} />

            </View>
            <View style={ListViewStyle.body}>

                     <Text style={[General.h2,ListViewStyle.title]}>
                       {rowData.title}
                     </Text>
                  <Text numberOfLines={2} style={ListViewStyle.description}>
                     {rowData.city.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) }
                  </Text>
               <View style={ListViewStyle.categoriesContainer}>
                  {rowData.categories.map((categorie,index) => (
                     <View key={index} style={ListViewStyle.categoryItemContainer}>
                        <Text style={ListViewStyle.categoryItem}>
                           {'#'+categorie.name}
                        </Text>
                     </View>
                  ))}

               </View>
            </View>
         </View>
         </TouchableOpacity>
      )
   }

   render() {
      var currentView = (this.state.isLoading) ? <LoadingIcon /> :
      <ListView
         style={ListViewStyle.container}
         dataSource={this.state.dataSource}
         stickySectionHeadersEnabled={true}
         renderRow={this._renderRow.bind(this)}
         renderSectionHeader={this._renderSectionHeader.bind(this)}
         renderSeparator={(sectionID, rowID) =>
          <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
         }
         renderFooter={() =><View style={ListViewStyle.footer} />}
         enableEmptySections={true}
         onEndReached={this.onEndReached.bind(this)}
         refreshControl={
            <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this._onRefresh.bind(this)}
            />
         }
      />
      return (
         <View style={General.container}>
            <View style={ComponentStyle.headerContainer}>
               <View style={ComponentStyle.filterIconContainer}>

               </View>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h4, ComponentStyle.headerTitle]}>
                     {getTranslation('eventsMenuItem')}
                  </Text>
               </View>
               <View style={ComponentStyle.filterIconContainer}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="search" size={24} color={COLOR.WHITE} />
                  </View>
               </View>
            </View>
            {currentView}
         </View>
      )
   }
}
