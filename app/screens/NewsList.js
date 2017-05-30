import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { filterData } from '../helpers/Filters';
import { formatDate } from '../helpers/FormatDate';
import { setStorageData, getStorageData, checkStorageKey } from '../helpers/Storage';
import { statusBar } from '../helpers/StatusBar';

import { General, ListViewStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://eric-project.c4x.nl/api/news";
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

      checkStorageKey(storageKey).then((isValidKey) => {

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
            Api.getData(apiLink,headers)
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
      Actions.newsItem({newsId:id})
   }

   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    */
   _renderRow (rowData) {
      return (
         <TouchableOpacity onPress={function(){this.onItemPress(rowData.id)}.bind(this)}>
            <View style={[ListViewStyle.row, ListViewStyle.newsBody]}>
               <View>
                  <Image source={{ uri: rowData.thumbnail}} style={ListViewStyle.photo} />
                  <View style={ListViewStyle.readLenghtContainer}>
                     <Text style={ListViewStyle.readLengthText}>
                        <Icon name="clock-o" size={12} color="#fff" /> 5 {getTranslation('readLength')}
                     </Text>
                  </View>
               </View>
               <View style={ListViewStyle.body}>
                  <View style={[ListViewStyle.dateContainer, ListViewStyle.newsDateContainer]}>
                     <View style={ListViewStyle.month}>
                        <Text style={[ListViewStyle.monthText, ListViewStyle.newsMonth]}>
                          Mei
                        </Text>
                     </View>
                     <View style={ListViewStyle.day}>
                        <Text style={[ListViewStyle.dayText, ListViewStyle.newsDay]}>
                          2
                        </Text>
                     </View>
                  </View>
                  <View style={ListViewStyle.textContainer}>
                     <View style={ListViewStyle.titleContainer}>
                        <Text numberOfLines={2} style={[ListViewStyle.title, ListViewStyle.newsTitle]}>
                          {rowData.summary}
                        </Text>
                     </View>
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
      />
      return (
         <View style={General.container}>
            <View style={ComponentStyle.headerContainer}>
               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={General.h4}>
                     {getTranslation('newsMenuItem')}
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

// <TextInput
//    style={[ComponentStyle.searchBarInput]}
//    placeholder={getTranslation('searchTerm')}
//    onChange={this.setSearchText.bind(this)}
// />
