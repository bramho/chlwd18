import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, SectionList,TextInput, TouchableOpacity, TouchableHighlight, AsyncStorage, RefreshControl, Alert} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import StatusBarAlert from 'react-native-statusbar-alert';

import Icon from '../helpers/Icons';

var moment = require('moment');
var COLOR = require('../assets/styles/COLOR');

import LoadingIcon from '../components/LoadingIcon';

import ErrorNotification from '../components/ErrorNotification';

import Row from '../components/EventRow';
import SectionHeader from '../components/SectionHeader';


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
   number: 10,
   pageNumber:1,
   sort:'date',
   from:'',
   until:'',
   category:'',
   location:'',
   minPrice:'',
   maxPrice:'',
}

const MAXPRICEVALUE = 230;

const apiLink = "https://www.vanplan.nl/viewapi/v1/agenda/lf2018?apiversion=v1&paper=lc&apitype=agenda&number="+params.number+"&pageNumber="+params.pageNumber+"&sort="+params.sort+"&from="+params.from+"&until="+params.until+"&category="+params.category+"&location="+params.location+"&minprice="+params.minPrice+"&maxprice="+params.maxPrice+"&type=-";

const imgLink = "https://2018.vanplan.nl/contentfiles/";

var listData = [];

var favorites = [];
var favoritesIds = [];

var favoriteButton;
var categories;



export default class EventsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         // dataSource:new ListView.DataSource({
         //    rowHasChanged: (r1, r2) => r1 !== r2,
         //    sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
         // }),
         data:[],
         isLoading:true,
         rawData: '',
         apiData: '',
         searchText: '',
         myKey: '',
         refreshing: false,
         index: 0,
         waiting:false,
         pageNumber:1,
         maxPriceValue: MAXPRICEVALUE,
         error: "",
      };


   }

   componentWillReceiveProps(props) {

      if (props.isFilter === true) {
         var fromDateFormat = moment(props.from).toISOString();
         var untilDateFormat = moment(props.until).toISOString();

         const newApiLink = "https://www.vanplan.nl/viewapi/v1/agenda/lf2018?apiversion=v1&paper=lc&apitype=agenda&number=10&pageNumber=1&sort="+props.sort+"&from="+fromDateFormat+"&until="+untilDateFormat+"&category="+props.categoryId+"&location=&minprice=&maxprice="+props.maxPrice+"&type=-";

         console.log(newApiLink);

         this.setState({
            isLoading: true,
            maxPriceValue: props.maxPrice,
            categoryId: props.categoryId,
            fromDate: props.from,
            untilDate: props.until,
         });

         this.getEventData(newApiLink, 'eventList', true);
      } else {
         this.getEventData(apiLink, 'eventList', false);
      }
   }

   componentDidMount() {
      // this.setState({
      //    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.formatData(listData))
      // })
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

      var storageKey = 'eventList';

      removeItemFromStorage('eventList');

      await checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data);

               this.setState({
                  //dataSource: this.state.dataSource.cloneWithRowsAndSections(this.formatData(storageData)),
                  data:this.formatData(storageData),
                  apiData: storageData,
                  // isLoading: false,
                  empty: false,
                  rawData: storageData,
               });
            })
            .catch((error) => {
               console.error(error);

               this.setState({
                  empty: true,
                  isLoading: false,
                  error: <ErrorNotification errorNumber={100} />,
               })
            });

         } else {
            this.getEventData(apiLink, storageKey, false);
         }
      });
   }

   /**
    * Gets event data from apiLink and stores it in the cache
    * @param  {string} apiLink      Url to API
    * @param  {string} storageKey   Key for local storage
    * @return {JSON}                List of events
    */
   getEventData(apiLink, storageKey, isFilter) {

      if (this.state.isLoading === false) {
         this.setState({isLoading: true});
      }

      Api.getData(apiLink)
         .then((data) => {
            listData = data.results;

            this.setState({
               //dataSource: this.state.dataSource.cloneWithRowsAndSections(this.formatData(listData)),
               data:this.formatData(listData),
               apiData: data.results,
               isLoading: false,
               empty: false,
               rawData: data.results,
            });

            if (!isFilter) {
               setStorageData(storageKey, listData);

               if (this.state.refreshing) {
                  this.setState({refreshing: false})
               }
            }


         })
         .catch((error) => {
            console.log(error);

            this.setState({
               empty: true,
               isLoading: false,
               error: <ErrorNotification errorNumber={100} />,
            });
         });
   }

   /**
    * formats the data for the ListView
    * @param  {object} data dataObject from the server
    * @return {object}      [returns formated data object that can be readed by sectionlistview]
    */
   formatData(data) {
      // new store map array
      const eventMap = [];
      const returnArray = [];
      // loops al data from data object
      for (let sectionId = 0; sectionId  < data.length; sectionId++) {
         // if data array is not already added to the store map
         if(!eventMap[data[sectionId].startDate]) {
            // Add  new array in array
            eventMap[data[sectionId].startDate] = [];
         }
         data[sectionId].key = sectionId;
         eventMap[data[sectionId].startDate].push(data[sectionId]);
      }
      console.log(eventMap);
      for(eventKey in eventMap) {
         console.log(eventKey);
         let eventObject = {
            data:eventMap[eventKey],
            key:eventKey
         }
         returnArray.push(eventObject);
      }
      console.log(returnArray);
      return returnArray ;
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
   // setSearchText(event) {
   //    let searchText = event.nativeEvent.text;
   //    let filteredData = filterData(searchText, this.state.apiData, 'events');
   //
   //    this.setState({
   //       searchText,
   //       dataSource: this.state.dataSource.cloneWithRows(filteredData),
   //    });
   // }

   /**
    * Gets called when a user drags the listview down to reload.
    * It reloads the events by calling the API.
    */
   _onRefresh() {
      this.setState({refreshing: true});

      this.fetchData().then(() => {
         this.setState({refreshing: false})
      });

      this.getEventData(apiLink, 'eventList', false);
      this.setFavorites();

   }

   /**
    * Adds event to favorites
    * @param {Object} rowData    Data containing row information
    */
   addOrRemoveFavorite (rowData) {

      var index = favoritesIds.indexOf(rowData.id);

      console.log('Saved events index: ' + index);

      if (index === -1) {
         setFavorite(rowData, true, favoritesIds);

         let notificationText = 'Evenement is toegevoegd aan jou favorieten';

         this.setNotification(notificationText);

      } else {
         setFavorite(rowData, false, favoritesIds);

         let notificationText = 'Evenement is verwijderd uit jou favorieten';

         this.setNotification(notificationText);
      }
   }

   /**
    * Sets notification for user feedback
    * @param {String} notificationText
    */
   setNotification(notificationText) {

      this.setState({notification: <StatusBarAlert
        visible={true}
        message={notificationText}
        backgroundColor={COLOR.BLUE}
        color="white"
        statusbarHeight={15}
      />});

      setTimeout(() => {this.setState({refreshHeartIcon: true})}, 200)

      setTimeout(() => {   this.setState({notification: <StatusBarAlert
                                 visible={false}
                                 statusbarHeight={0}
                                 backgroundColor={COLOR.BLUE}
                              />
                           });
                           clearTimeout()
                        }, 4000);

   }

   //WIP
   /**
    * When the user scrolled to the end, this function will run.
    * @return {[type]} [description]
    */
   onEndReached() {
      // if (!this.state.waiting) {
      //
      //
      // }
   }

   renderItem = (itemData) => {
      var heartIcon;

      if (favoritesIds.indexOf(itemData.id) !== -1) {
         heartIcon = <Icon name="heart-fill" size={30} color={COLOR.WHITE} />
      } else {
         heartIcon = <Icon name="heart" size={30} color={COLOR.WHITE} />
      }

      var swipeOutBtnLeft = [
         {
            component: <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>{heartIcon}</View>,
            backgroundColor: COLOR.BLUE,
            underlayColor: COLOR.BLUE,
            onPress: () => this.addOrRemoveFavorite(itemData),
         }
      ]
      return (
         <Swipeout left={swipeOutBtnLeft} backgroundColor='transparent' buttonWidth={100}>
            <Row {...itemData} />
         </Swipeout>
      )
   }

   render() {
      var currentView = (this.state.isLoading) ? <LoadingIcon /> : <SectionList
         style={ListViewStyle.container}
         sections={this.state.data}
         renderItem={({item}) => this.renderItem(item)}
         renderSectionHeader={(sectionData) => <SectionHeader listview="events" {...sectionData} />}
         stickySectionHeadersEnabled={true}
         renderFooter={() =><View style={ListViewStyle.footer} />}
         onEndReached={this.onEndReached.bind(this)}
         refreshing={this.state.refreshing}
         onRefresh={this._onRefresh.bind(this)}
      />

      currentView = (this.state.error === "") ? currentView : this.state.error;

      return (
         <View style={General.container}>
            <View style={ComponentStyle.headerContainer}>
               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.settings()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="clock" size={25} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h4, ComponentStyle.headerTitle]}>
                     {getTranslation('eventsMenuItem')}
                  </Text>
               </View>

               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.filterModal({maxPriceValue: this.state.maxPriceValue, categoryId: this.state.categoryId, date: this.state.fromDate, untilDate: this.state.untilDate})}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="search" size={24} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>
            </View>
            {this.state.notification}
            {currentView}
         </View>
      )
   }
}
