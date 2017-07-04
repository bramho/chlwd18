import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, FlatList,TextInput, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import StatusBarAlert from 'react-native-statusbar-alert';

import LoadingIcon from '../components/LoadingIcon';
import ErrorNotification from '../components/ErrorNotification';
import SectionHeader from '../components/SectionHeader';
import Row from '../components/EventRow';

import Icon from '../helpers/Icons';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, getStorageData, checkStorageKey, removeItemFromStorage, setFavoriteIds, setFavorite } from '../helpers/Storage';
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

      this.setFavorites();

      statusBar();
   }

   componentWillUnmound() {
      // This prevents memory leaks when a user leaves the component while a timeout is running
      clearTimeout();
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData = async () => {

      var storageKey = 'savedEvents';

      // Use this to clear the favorite local storage.
      // removeItemFromStorage(storageKey);

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

                  console.log(favoritesIds);

                  this.setState({
                     isLoading: false,
                  });
               });
            });
         }
      });
   }

   /**
    * Removes item from favorite list
    * @param  {Object} item   Item to be deleted
    */
   removeFromFavorite (item) {
      var index = favoritesIds.indexOf(item.id);

      newData = this.state.data;
      console.log(newData);
      newData.splice(index, 1);

      this.setState({data: newData});

      let notificationText = 'Evenement is verwijderd uit jou favorieten';
      this.setNotification(notificationText);

      setFavorite(item, false, favoritesIds);
   }

   /**
    * Sets notification for user feedback
    * @param {String} notificationText
    */
   setNotification(notificationText) {

      console.log(notificationText);

      this.setState({notification: <StatusBarAlert
        visible={true}
        message={notificationText}
        backgroundColor={COLOR.RED}
        color="white"
        statusbarHeight={15}
      />});

      setTimeout(() => {   this.setState({notification: <StatusBarAlert
                                 visible={false}
                                 statusbarHeight={0}
                                 backgroundColor={COLOR.RED}
                              />
                           });
                           clearTimeout()
                        }, 4000);

   }

   /**
    * Refreshes the scene
    */
   _onRefresh() {
      this.setState({refreshing: true});

      this.fetchData().then(() => {
         this.setState({refreshing: false})
      });

   }

   /**
    * Renders Swipeout Item for a row
    * @param  {Object} itemData     Row item
    * @return {Swipeout}            Swipeout row-wrapper
    */
   _renderItem = (itemData) => {
      var trashIcon = <Icon name="delete" size={30} color={COLOR.WHITE} />;

      var swipeOutBtnRight = [
         {
            component: <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>{trashIcon}</View>,
            backgroundColor: COLOR.RED,
            underlayColor: COLOR.RED,
            onPress: () => {this.removeFromFavorite(itemData)},
         }
      ]
      return (
         <Swipeout right={swipeOutBtnRight} backgroundColor='transparent' buttonWidth={100}>
            <Row {...itemData} />
         </Swipeout>
      )
   }

   render() {
      var currentView = (this.state.isLoading) ? <LoadingIcon /> :
      <FlatList
         style={ListViewStyle.container}
         data={this.state.data}
         renderItem={({item}) => this._renderItem(item)}
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
            {this.state.notification}
            {currentView}
         </View>
      )
   }
}
