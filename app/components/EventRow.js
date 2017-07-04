import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { Scene, Actions } from 'react-native-router-flux';
import { General, ListViewStyle } from '../assets/styles/General';
/**
* When user pressed on event item
* @param  {interger} id of the event
* @param  {object} data data object
*/
function onItemPress(id, data) {
   Actions.eventItem({eventId:id, rowData:data})
}

const imgLink = "https://www.vanplan.nl/contentfiles/";

const Row = (props) => (
   <TouchableOpacity onPress={function(){onItemPress(props.id, props)}.bind(this)}>
   {console.log(props)}
   <View style={ListViewStyle.row}>
      <View style={ListViewStyle.pic}>
         <Image source={{ uri: imgLink+props.image_uri}} style={ListViewStyle.photo} />

      </View>
      <View style={ListViewStyle.body}>

               <Text style={[General.h2,ListViewStyle.title]}>
                 {props.title}
               </Text>
            <Text numberOfLines={2} style={ListViewStyle.description}>
               {props.city.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) }
            </Text>
         <View style={ListViewStyle.categoriesContainer}>
            {props.categories.map((categorie,index) => (
               <View key={index} style={ListViewStyle.categoryItemContainer}>
                  <Text style={ListViewStyle.categoryItem}>
                     {'#'+categorie.name}
                  </Text>
               </View>
            ))}

         </View>
      </View>
   </View>
   </TouchableOpacity>
)

export default Row;
