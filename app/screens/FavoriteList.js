import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, FlatList,TextInput, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
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

var listData = [];

var favorites = [];
var favoritesIds = [];

export default class FavoriteList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         data: listData,
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

      //removeItemFromStorage(storageKey);

      checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data);
               console.log(storageData);
               if (storageData.length === 0) {
                  this.setState({
                     error: <ErrorNotification errorNumber={1} />,
                  })
               }

               this.setState({
                  data: storageData,
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
         data: filteredData,
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

   render() {
      var currentView = (this.state.isLoading) ? <LoadingIcon /> :
      <FlatList
         style={ListViewStyle.container}
         data={this.state.data}
         renderItem={(data) => <Row {...data.item} />}
         ItemSeparatorComponent={()=><View style={ListViewStyle.separator} /> }
         keyExtractor={(item, index) => item.id}
         renderFooter={() =><View style={ListViewStyle.footer} />}
         refreshing={this.state.refreshing}
         onRefresh={this._onRefresh.bind(this)}
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
