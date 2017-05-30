import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, TouchableHighlight, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

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
const apiLink = "https://www.vanplan.nl/viewapi/v1/agenda/lc?apiversion=v1&paper=lc&apitype=agenda&number=10&pageNumber=1&sort=date&from=&until=&category=&location=&minprice=&maxprice=&type=-";

const imgLink = "https://www.vanplan.nl/contentfiles/";

/**
 * New initialisation of the ListView datasource object
 */
 const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
 });
var listData = [];

var favorites = [];
var favoritesIds = [];

var favoriteButton;
var categories;

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
         index: 0,
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

      // removeItemFromStorage('eventList');

      await checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data);

               this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(storageData),
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
                     dataSource: this.state.dataSource.cloneWithRows(data.results),
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

               console.log(favorites);

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

   setFavoriteButton(id, isReset) {

      var index = favoritesIds.indexOf(id);

      if (isReset) {
         if (index === -1) {
            favoriteButton = <Icon name="heart" size={20} color="#F02C32" />;
         } else {
            favoriteButton = <Icon name="heart-o" size={20} color="#FFF" />;
         }
      } else {
         if (index === -1) {
            favoriteButton = <Icon name="heart-o" size={20} color="#FFF" />;
         } else {
            favoriteButton = <Icon name="heart" size={20} color="#F02C32" />;
         }
      }
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
      console.log('You Pressed');
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
   /**
    * When the user scrolled to the end, this function will run.
    * @return {[type]} [description]
    */
   onEndReached() {
      if (!this.state.waiting) {
        this.setState({isLoading: true});

      }
   }
   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    */
   _renderRow (rowData) {
      console.log(formatDate(rowData.startDate,'eventList-day'));
      return (
         <TouchableOpacity onPress={function(){this.onItemPress(rowData.id, rowData)}.bind(this)}>
         <View style={ListViewStyle.row}>
            <View>
               <Image source={{ uri: imgLink+rowData.image_uri}} style={ListViewStyle.photo} />
               <View style={ListViewStyle.priceContainer}>
                  <View style={ListViewStyle.price}>
                     <Text style={ListViewStyle.priceText}>
                        € {rowData.ticketUrls[0].price}
                     </Text>
                  </View>
               </View>

               <View style={ListViewStyle.addToFavoritesContainer}>
                  <TouchableOpacity onPress={function(){this.addOrRemoveFavorite(rowData)}.bind(this)}>
                     <Text>
                        {this.setFavoriteButton(rowData.id, false)}
                        {favoriteButton}
                     </Text>
                  </TouchableOpacity>
               </View>

               <View style={ListViewStyle.categoriesContainer}>
                  <View style={[ListViewStyle.categoryItemContainer, ListViewStyle.categoryItemCultuur]}>
                     <Text style={ListViewStyle.categoryItem}>
                        {rowData.categories[0].name}
                     </Text>
                  </View>
               </View>
            </View>
            <View style={ListViewStyle.body}>
               <View style={ListViewStyle.dateContainer}>
                  <View style={ListViewStyle.day}>
                     <Text style={ListViewStyle.dayText}>
                       {formatDate(rowData.startDate,'eventList-day')}
                     </Text>
                  </View>
                  <View style={ListViewStyle.month}>
                     <Text style={ListViewStyle.monthText}>
                       {formatDate(rowData.startDate,'eventList-month')}
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
                     <Icon name="map-marker" size={14} color="#b2b2b2" /> {rowData.location + '- ' + rowData.city}
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
         onEndReached={this.onEndReached}
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
               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={General.h4}>
                     {getTranslation('eventsMenuItem')}
                  </Text>
               </View>
               <TouchableOpacity style={ComponentStyle.filterIconContainer}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="search" size={18} color="#F02C32" />
                  </View>
               </TouchableOpacity>
            </View>
            {currentView}
         </View>
      )
   }
}
