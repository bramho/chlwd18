import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, getStorageData, checkStorageKey, removeItemFromStorage } from '../helpers/Storage';
import { statusBar } from '../helpers/StatusBar';

import { General, ListViewStyle, ComponentStyle } from '../assets/styles/General';

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

export default class FavoriteList extends Component {
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

      statusBar();
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData = async () => {

      var storageKey = 'savedEvents';

      checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data);

               console.log('Favorites:');
               console.log(storageData);

               this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(storageData),
                  apiData: storageData,
                  isLoading: false,
                  empty: false,
                  rawData: storageData,
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
            Actions.eventItemFavorites({eventId:id})
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

   setFavoriteButton(id, isReset) {

      var index = favoritesIds.indexOf(id);

      if (isReset) {
         if (index === -1) {
            return <Icon name="heart-o" size={20} color="#FFF" />;
         } else {
            return <Icon name="heart" size={20} color="#F02C32" />;
         }
      } else {
         if (index === -1) {
            return <Icon name="heart" size={20} color="#F02C32" />;
         } else {
            return <Icon name="heart-o" size={20} color="#FFF" />;
         }
      }
   }

   addOrRemoveFavorite (id) {
      console.log(id);

      var index = favoritesIds.indexOf(id);

      if (index === -1) {
         setFavorite(id, true, favoritesIds);
      } else {
         setFavorite(id, false, favoritesIds);
      }
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
                  <Image source={{ uri: imgLink+rowData.image_uri}} style={ListViewStyle.photo} />
                  <View style={ListViewStyle.priceContainer}>
                     <View style={ListViewStyle.price}>
                        <Text style={ListViewStyle.priceText}>
                           € {rowData.ticketUrls[0].price}
                        </Text>
                     </View>
                  </View>

                  <View style={ListViewStyle.addToFavoritesContainer}>
                     <TouchableOpacity onPress={function(){this.addOrRemoveFavorite(rowData.id)}.bind(this)}>
                        <Text>
                           {this.setFavoriteButton(rowData.id, false)}
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
         style={[ListViewStyle.container, ListViewStyle.favoritesContainer]}
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
            <View style={ComponentStyle.headerContainer}>
               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={General.h4}>
                     {getTranslation('favoritesMenuItem')}
                  </Text>
               </View>
               <View style={ComponentStyle.filterIconContainer}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="search" size={18} color="#F02C32" />
                  </View>
               </View>
            </View>
            {currentView}
         </View>
      )
   }
}
