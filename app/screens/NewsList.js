import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';

import LoadingIcon from '../components/LoadingIcon';
import ErrorNotification from '../components/ErrorNotification';

import Icon from '../helpers/Icons';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, removeItemFromStorage,getStorageData, checkStorageKey } from '../helpers/Storage';
import { statusBar } from '../helpers/StatusBar';

var COLOR = require('../assets/styles/COLOR');
import { General, ListViewStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
//const apiLink = "https://eric-project.c4x.nl/api/news";
const apiLink = "https://kh2018-acc.ndcmediagroep.nl/services/article";
const headers = {'Authorization': 'Basic bmRjOjJ0T01haGF3az8=' }
/**
 * New initialisation of the ListView datasource object
 */
const dataSource = new ListView.DataSource({
   rowHasChanged: (r1, r2) => r1 !== r2,
   sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
});

var listData = [];

export default class NewsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dataSource: dataSource.cloneWithRowsAndSections(this.formatData(listData)),
         isLoading:true,
         rawData: '',
         apiData: '',
         refreshing: false,
         searchText: '',
         myKey: '',
         error: "",
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
   fetchData() {

      var storageKey = 'newsList';
          removeItemFromStorage(storageKey);
      checkStorageKey(storageKey).then((isValidKey) => {

         if(isValidKey) {
            getStorageData(storageKey).then((data) => {

               storageData = JSON.parse(data.articles);

               this.setState({
                  dataSource: dataSource.cloneWithRowsAndSections(this.formatData(storageData)),
                  apiData: storageData,
                  isLoading: false,
                  empty: false,
                  rawData: storageData,
               });
            })
            .catch((error) => {
               console.error(error);
               this.setState({
                  error: <ErrorNotification errorNumber={200} />,
               });
            });
         } else {
            Api.getData(apiLink,headers)
               .then((data) => {

                  listData = data.articles;

                  this.setState({
                     dataSource: dataSource.cloneWithRowsAndSections(this.formatData(listData)),
                     apiData: data,
                     isLoading: false,
                     empty: false,
                     rawData: data,
                  });

                  //console.log(listData);

               })
               .catch((error) => {
                  console.log(error)
                  this.setState({
                     empty: true,
                     isLoading: false,
                     error: <ErrorNotification errorNumber={200} />,
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
      // new store map array
      const eventMap = [];

      var startDate = '2017-06-14T09:21:25+00:00';
      eventMap[startDate] = data;
      console.log(eventMap);
      // loops al data from data object
      // for (let sectionId = 0; sectionId  < data.length; sectionId++) {
      //    // if data array is not already added to the store map
      //    //var startDate = eventMap[data[sectionId].startDate];
      //    var startDate = '2017-06-14T09:21:25+00:00';
      //    //if(!startDate) {
      //       // Add  new array in array
      //       eventMap[startDate] = data;
      //    //}
      //    // console.log(data[sectionId]);
      //    // eventMap[startDate].push(data[sectionId]);
      //    // console.log(eventMap);
      // }
      return eventMap ;
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
      Actions.newsItem({newsId:id})
   }

   _onRefresh() {
      this.setState({refreshing: true});

      this.fetchData().then(() => {
         this.setState({refreshing: false})
      });

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
   /**
    * Renders section headers with date
    * @param  {object} sectionData section data object, including keys en children data
    * @param  {string} date       ISO Date format
    * @return {object}            returns rendered data object
    */
   _renderSectionHeader(sectionData, date) {
      return (
         <View style={[ListViewStyle.sectionHeader,ListViewStyle.sectionHeaderEvents]}>
            <Text style={ListViewStyle.sectionHeaderText}>{formatDate(date, 'listView')}</Text>
         </View>
      )
   }

   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    *
    */
    _renderRow (rowData) {
      var pictureUrl = require('../assets/images/noImage.png');
      // WIP this is for pulling images
      // if(rowData.images.length > 0) {
      //    var picture = rowData.images[0].imageVariantDtoList[0].fileName;
      //    fetch(picture,{headers})
      //    .then(
      //       (response) => {
      //          let base64Str = response.data;
      //            pictureUrl = 'data:'+mimetype_attachment+';base64,'+base64Str;
      //            // Return base64 image
      //            RESOLVE(pictureUrl)
      //       }
      //
      //    ).catch((error) => {
      //       console.log(error)     });
      // } else {
      //    pictureUrl = '../assets/noImage.png';
      // }
      // console.log(pictureUrl);
      //var picture =
      return (
         <TouchableOpacity onPress={function(){this.onItemPress(rowData.id, rowData)}.bind(this)}>
         <View style={ListViewStyle.row}>
            <View style={ListViewStyle.pic}>
               <Image source={pictureUrl} style={ListViewStyle.photo} />

            </View>
            <View style={ListViewStyle.body}>

                     <Text style={[General.h2,ListViewStyle.title]}>
                       {rowData.title}
                     </Text>
                  <Text numberOfLines={2} style={ListViewStyle.description}>
                     dgasdkflkasdnkfn
                  </Text>

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
         renderSeparator={(sectionID, rowID) =>
          <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
         }
         renderSectionHeader={this._renderSectionHeader.bind(this)}

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

      currentView = (this.state.error === "") ? currentView : this.state.error

      return (
         <View style={General.container}>
            <View style={ComponentStyle.headerContainer}>
               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.settings()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="settings" size={32} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h4, ComponentStyle.headerTitle]}>
                     {getTranslation('newsMenuItem')}
                  </Text>
               </View>

               <View style={ComponentStyle.filterIconContainer}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="search" size={32} color={COLOR.WHITE} />
                  </View>
               </View>
            </View>
            {currentView}
         </View>
      )
   }
}
