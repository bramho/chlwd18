import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView,TextInput} from 'react-native';

import SearchBarComponent from '../components/SearchBar';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';

/**
 * Importing stylesheets for the screen.
 */
import { Basic, ListViewStyle } from '../assets/stylesheets/stylesheet-basic';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://eric-project.c4x.nl/api/events";

/**
 * New ListView datasource object
 */
const ds = new ListView.DataSource({
   rowHasChanged: (row1, row2) => row1 !== row2,
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C1C1C1',
   },
   input: {
      height: 30,
      flex: 1,
      paddingHorizontal: 8,
      fontSize: 15,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
   },
});

export default class EventsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dataSource: ds,
         rawData: '',
         apiData: '',
      };

   }
   componentDidMount() {
      Api.getData(apiLink).then((res)=>{
         console.log(res);
         this.setState({
           dataSource: ds.cloneWithRows(res),
           apiData: res,
         });
      }).catch((error) => {
         console.error(error);
      });;
   }

   fetchData() {
      Api.getData(apiLink)
         .then((data) => {
            this.setState({
               dataSource: this.ds.cloneWithRows(data),
               isLoading: false,
               empty: false,
               rawData: data,
            });
         })
         .catch((error) => {
            console.log(error)
            this.setState({
               empty: true,
               isLoading: false,
            });
         });
   }

   setSearchText(event) {
      let searchText = event.nativeEvent.text;
      console.log(this.state.apiData);
      let filteredData = this.filterData(searchText, this.state.apiData);

      console.log('Data: ' + filteredData);

      this.setState({
         searchText,
         dataSource: this.state.dataSource.cloneWithRows(filteredData),
      });
   }

   filterData(searchText, data) {
      let text = searchText.toLowerCase();
      var rows = [];

      var i;
      var count = 0;

      for (i in data) {
         if (data.hasOwnProperty(i)) {
            count++;
         }
      }

      // console.log(count);

      for (var i=0; i < count; i++) {

        var stateName = data[i].title.toLowerCase();
        if(stateName.search(text) !== -1){
            rows.push({
                 title : data[i].title,
                 ticket_prices: data[i].ticket_prices,
                 summary: data[i].summary,
                 thumbnail: data[i].thumbnail,
             });
        }
      }

      console.log(rows);

      return rows;
   }

   /**
    * [Set row attribute for the ListView in render()]
    * @param  {dataObject}    rowData  dataObject with data to display in a row.
    * @return [markup]        Returns the template for the row in ListView.
    */
   _renderRow (rowData) {
      return (
         <View style={ListViewStyle.row}>
            <Image source={{ uri: rowData.thumbnail}} style={ListViewStyle.photo} />
            <View style={ListViewStyle.body}>
               <View style={ListViewStyle.title_price}>
                  <Text style={ListViewStyle.title}>
                    {rowData.title}
                  </Text>
                  <Text style={ListViewStyle.price}>
                    {rowData.ticket_prices.adult}
                  </Text>
               </View>
               <Text numberOfLines={2} style={ListViewStyle.description}>
                 {rowData.summary}
               </Text>
            </View>

         </View>
      )
   }
   _renderHeader() {

   }
   render() {
       console.log("Data: ", this.state.dataSource);
      return (
         <ListView
            style={ListViewStyle.container}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderHeader={() =>
                                 <View style={styles.container}>
                                    <TextInput
                                       style={styles.input}
                                       placeholder={getTranslation('searchTerm')}
                                       onChange={this.setSearchText.bind(this)}
                                    />
                                 </View>
                              }
            renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
            }
         />
      )
   }
}
