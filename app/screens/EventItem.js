import React, { Component } from 'react';
import { StyleSheet, Text, Image, View,TextInput, Animated, ScrollView,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { setFavorite, checkFavorite, checkStorageKey, getStorageData } from '../helpers/Storage';
import { formatDate } from '../helpers/FormatDate';

import { General, EventStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://eric-project.c4x.nl/api/events/";

/**
 * New initialisation of the EventItem datasource object
 */
export default class EventItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         data: '',
         isLoading: true,
         id:this.props.eventId,
      };

      console.log(this.props.eventId);



   }

   componentDidMount() {
      this.fetchData(this.state.id);

      this.setFavoriteButton(false);

   }

   addOrRemoveFavorite (addToFavorites) {
      console.log('Add to favorites: ' + addToFavorites);
      setFavorite(this.state.id, addToFavorites);
      this.setFavoriteButton(true);
   }

   setFavoriteButton(isReset) {
      checkStorageKey('savedEvents').then((isValidKey) => {

         if (isValidKey) {
            getStorageData('savedEvents').then((data) => {
               savedEvents = JSON.parse(data);

               var index = savedEvents.indexOf(this.state.id);

               if(isReset) {
                  if (index === -1) {
                     return Actions.refresh({ rightTitle: getTranslation('removeFromFavorites'), onRight: function(){this.addOrRemoveFavorite(false)}.bind(this) })
                  } else {
                     return Actions.refresh({ rightTitle: getTranslation('addToFavorites'), onRight: function(){this.addOrRemoveFavorite(true)}.bind(this) })
                  }
               } else {
                  if (index === -1) {
                     return Actions.refresh({ rightTitle: getTranslation('addToFavorites'), onRight: function(){this.addOrRemoveFavorite(true)}.bind(this) })
                  } else {
                     return Actions.refresh({ rightTitle: getTranslation('removeFromFavorites'), onRight: function(){this.addOrRemoveFavorite(false)}.bind(this) })
                  }
               }

            });
         }
      });
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData(id) {
      Api.getData(apiLink+id)
         .then((data) => {
            this.setState({
               data: data,
               isLoading: false,
               empty: false,
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
   /**
    * Renders the header of the event
    */
   _renderHeader() {
      return (
         <Animated.View style={EventStyle.header}>
           <Animated.Image
             style={[
               EventStyle.backgroundImage
             ]}
             source={{uri: this.state.data.header_img_hdpi}}
           />
           <View style={EventStyle.headerContent}>
               <Text style={[General.title,EventStyle.headerText]}>{this.state.data.title}</Text>
               <Text style={[General.subTitle,EventStyle.headerText]}>{"€"+this.state.data.ticket_prices.adult}</Text>
               <Text style={[General.h2,EventStyle.headerText]}>{
                  formatDate(this.state.data.dateStart,'eventItem')
               }
               </Text>
           </View>
         </Animated.View>
      );
   }
   /**
    * Renders the Scrollview content, in this case the data from the events
    */
   _renderContent() {
      return (
         <ScrollView
         style={EventStyle.fill}
         >
            <View style={[EventStyle.scrollViewContent,General.textContainer]}>
              <View>
                  <Text style={General.h2}>{this.state.h1}</Text>
                  <Text style={General.p}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                  <Text style={General.p}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                  <Text style={General.p}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
              </View>
            </View>
         </ScrollView>
      );
   }
   /**
    * Renders the total view
    */
   render() {
      var currentView = (this.state.isLoading) ? <View style={{flex:1, backgroundColor: '#dddddd'}}><Text>Loading..</Text></View> :
         <View style={{flex:1}}>
         {this._renderHeader()}
         {this._renderContent()}
         </View>

      return (
         <View style={[General.container,{marginBottom:60}]}>
         {currentView}
         </View>

      )
   }
}
