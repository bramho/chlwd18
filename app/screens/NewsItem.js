import React, { Component } from 'react';
import { StyleSheet, Text, Image, View,TextInput, Animated, ScrollView,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { formatDate } from '../helpers/FormatDate';

import { General, NewsStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://eric-project.c4x.nl/api/news/";

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

   }

   componentDidMount() {
      this.fetchData(this.state.id);

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
    * Renders the Scrollview content, in this case the data from the events
    */
   _renderContent() {
      return (
         <ScrollView
         style={NewsStyle.fill}
         >
            <View style={[NewsStyle.scrollViewContent,General.textContainer]}>
            <View>
                <Text style={General.h1}>Dit is een titel haha doei</Text>
            </View>
              <View>

                  <Text style={General.p}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                  <Text style={General.p}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                  <Text style={General.h2}>Dit is een kop 2</Text>
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
         {this._renderContent()}
         </View>

      return (
         <View style={[General.container,{marginBottom:60}]}>
         {currentView}
         </View>

      )
   }
}
