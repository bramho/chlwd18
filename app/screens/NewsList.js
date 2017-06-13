import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';

import LoadingIcon from '../components/LoadingIcon';

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
 const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
 });
var listData = [];

export default class NewsList extends Component {
   constructor(props) {
      super(props);
      var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      this.state = {
         dataSource: dataSource.cloneWithRows(listData),
         isLoading:true,
         rawData: '',
         apiData: '',
         searchText: '',
         myKey: ''
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

               storageData = JSON.parse(data.results);

               this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(storageData),
                  apiData: storageData,
                  isLoading: false,
                  empty: false,
                  rawData: storageData,
               });
            });
         } else {
            Api.getData(apiLink,headers)
               .then((data) => {
                  listData = data.articles;
                  console.log(listData);
                  this.setState({
                     dataSource: this.state.dataSource.cloneWithRows(data.articles),
                     apiData: data,
                     isLoading: false,
                     empty: false,
                     rawData: data,
                  });

                  console.log(listData);
                  //setStorageData(storageKey, listData);


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
      Actions.newsItem({newsId:id})
   }

   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    * <Image source={{ uri: rowData.images[0].imageVariantDtoList[0].fileName}} style={ListViewStyle.photo} />
    */
   _renderRow (rowData) {
      return (
         <TouchableOpacity onPress={function(){this.onItemPress(rowData.articleId)}.bind(this)}>
            <View style={[{flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderColor: COLOR.DARKWHITE}]}>
               <View style={{flex: 2,position:'relative',}}>
                  <Text style={{position: 'absolute', top: 4, left: 12, zIndex: 999, backgroundColor: 'transparent', color: COLOR.WHITE, fontFamily: 'Muli-Bold'}}>
                     12:00
                  </Text>
                  <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: COLOR.BLACK20, zIndex: 900}}>
                  </View>

               </View>

               <View style={{flex: 4}}>
                  <Text>{rowData.title}</Text>
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
         renderRow={this._renderRow.bind(this)}
         renderSeparator={(sectionID, rowID) =>
           <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
         }
         renderFooter={() =><View style={ListViewStyle.footer} />}
         enableEmptySections={true}
      />
      return (
         <View style={General.container}>
            <View style={[ComponentStyle.headerContainer, ComponentStyle.newsHeader]}>
               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.settings()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="clock" size={25} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h4, ComponentStyle.headerTitle]}>
                     {getTranslation('newsMenuItem')}
                  </Text>
               </View>

               <View style={ComponentStyle.filterIconContainer}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="search" size={18} color={COLOR.WHITE} />
                  </View>
               </View>
            </View>
            {currentView}
         </View>
      )
   }
}
