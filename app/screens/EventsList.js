import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView} from 'react-native';

import SearchBarComponent from '../components/SearchBar';

import Api from '../helpers/Api';

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

export default class EventsList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dataSource: ds
      };

   }
   componentDidMount() {
      Api.getData(apiLink).then((res)=>{
         console.log(res);
         this.setState({
           dataSource: ds.cloneWithRows(res)
         });
      }).catch((error) => {
         console.error(error);
      });;
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
            renderHeader={() => <SearchBarComponent />}
            renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={ListViewStyle.separator} />
            }
         />
      )
   }
}
