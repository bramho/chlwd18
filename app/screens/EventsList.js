import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ListView} from 'react-native';


import Api from '../helpers/Api';

import Basic from '../assets/stylesheets/stylesheet-basic';

const Events = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor:"#F5FCFF",
      paddingTop:20,
   },
   row: {
      flex: 1,
      marginLeft:10,
      marginRight:10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:"#ccc"
   },
   body: {
     padding:15,
     flex:1
   },
   title: {
      fontSize:20,
      flex:4,
   },
   title_price: {
      flex: 1,
      flexDirection: 'row',

   },
   price: {
      fontSize:12,
      right:0,
      backgroundColor:"#333",
      padding:5,
      height:28,
      color:"#fff"
   },
   text: {
      fontSize: 16,
   },
   photo: {
      height: 100,
      width: 100,
   },
   separator: {
      flex: 1,
      height: 10,
   },
});

const apiLink = "https://eric-project.c4x.nl/api/events";

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
      <View style={Events.row}>
         <Image source={{ uri: rowData.thumbnail}} style={Events.photo} />
         <View style={Events.body}>
            <View style={Events.title_price}>
               <Text style={Events.title}>
                 {rowData.title}
               </Text>
               <Text style={Events.price}>
                 {rowData.ticket_prices.adult}
               </Text>
            </View>
            <Text numberOfLines={2} style={Events.description}>
              {rowData.summary}
            </Text>
         </View>

      </View>
   )
   }
   render() {
       console.log("Data: ", this.state.dataSource);
      return (
         <ListView
            style={Events.container}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={Events.separator} />
            }
         />
      )
   }
}
