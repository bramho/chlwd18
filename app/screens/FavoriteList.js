import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';

import LoadingIcon from '../components/LoadingIcon';

import ErrorNotification from '../components/ErrorNotification';
import SectionHeader from '../components/SectionHeader';
import Row from '../components/EventRow';

import Icon from '../helpers/Icons';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, getStorageData, checkStorageKey, removeItemFromStorage } from '../helpers/Storage';
import { statusBar } from '../helpers/StatusBar';

var COLOR = require('../assets/styles/COLOR');
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
         error: "",
      };
   }

   componentWillMount() {
      Actions.refresh();
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

               if (storageData.length === 0) {
                  this.setState({
                     error: <ErrorNotification errorNumber={1} />,
                  })
               }

               this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(storageData),
                  apiData: storageData,
                  isLoading: false,
                  empty: false,
                  rawData: storageData,
               });
            })
            .catch((error) => {
               this.setState({
                  empty: true,
                  isLoading: false,
                  error: <ErrorNotification errorNumber={300} />,
               });

               console.log(error);
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
      Actions.eventItemFavorites({eventId:id, rowData:data})
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
                       <Icon name="pointer" size={18} color="#b2b2b2" /> {rowData.location + '- ' + rowData.city}
                     </Text>
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
         renderSectionHeader={(sectionData) => <SectionHeader listview="events" {...sectionData} />}
         renderRow={(data) => <Row {...data} />}

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

   currentView = (this.state.error === "") ? currentView : this.state.error;
      return (
         <View style={General.container}>
            <View style={ComponentStyle.headerContainer}>


               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h4, ComponentStyle.headerTitle]}>
                     {getTranslation('favoritesMenuItem')}
                  </Text>
               </View>

            </View>
            {currentView}
         </View>
      )
   }
}
