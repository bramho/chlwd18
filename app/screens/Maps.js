import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Dimensions, Animated} from 'react-native';
import { Scene,Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import { getTranslation, setLocale } from '../helpers/Translations.js';
import Api from '../helpers/Api';
import { General, MapsStyle} from '../assets/styles/General';

import Pointer from '../assets/images/pointer.png';
import PointerActive from '../assets/images/pointerActive.png';

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

const apiLink = "https://www.vanplan.nl/viewapi/v1/agenda/lc?apiversion=v1&paper=lc&apitype=agenda&number="+params.number+"&pageNumber="+params.pageNumber+"&sort="+params.sort+"&from="+params.from+"&until="+params.until+"&category="+params.category+"&location="+params.location+"&minprice="+params.minPrice+"&maxprice="+params.maxPrice+"&type=-";

const imgLink = "https://www.vanplan.nl/contentfiles/";


const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 53.2002316;
const LONGITUDE = 5.6784219;
const LATITUDE_DELTA = 1.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends Component {
   constructor(props) {
      super(props);

      this.state = {
         region: {
           latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         },
         lastLat: 53.156217,
         lastLong: 5.6975609,
         rawData:[],
         markers: [],
         activeEvent:null,
         slideAnim: new Animated.Value(.5*width),
      };
   }
   componentDidMount() {
      this.fetchData();

  }
  fetchData() {
     Api.getData(apiLink)
       .then((data) => {
          listData = data.results;
          var markers = [];
          var locations = [];
          for (var i = 0; i < listData.length; i++) {
             if(listData[i].latitude !== null && listData[i].longitude !== null) {

                var keyInArray = locations.indexOf(listData[i].locationId);

                var eventRow = {
                   id:listData[i].id,
                   title:listData[i].title,
                   subTitle:listData[i].subtitle,
                   thumb:listData[i].image_uri,
                   tags:listData[i].categories
                }
               if (keyInArray == -1) {
                  var marker = {
                    id: listData[i].locationId,
                    key: i,
                    coordinate: {
                        latitude: listData[i].latitude,
                        longitude: listData[i].longitude,
                    },
                    title:listData[i].location,
                    events: [eventRow]
                  }
                  locations.push(listData[i].locationId);
                  markers.push(marker);

               } else {
                  markers[keyInArray].events.push(eventRow);
               }
            }
            console.log(markers);
          }
          this.setState({
              rawData: data.results,
              markers:markers
          });
          //console.log(this.state.rawData);
       })
       .catch((error) => {
          console.log(error)
          this.setState({
              empty: true,
              isLoading: false,
          });
       });
 }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      region: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }
  onItemPress(id) {
     Actions.eventItemMaps({eventId:id})

   }
  /**
   * If the user pressed on the marker of the event
   * @param  {number} id  id of the event
   * @param  {key} key in the array of the JSON object
   */
  onMarkerPress(e,key,events) {
     console.log(events);
     //Sets the active event
      this.state.activeEvent = { events: events, key:key};
      /**
       * Animate the show animation of the overlay.
       */
      Animated.timing(                  // Animate over time
      this.state.slideAnim,            // The animated value to drive
         {
            toValue: 0,                   // Animate to opacity: 1 (opaque)
            duration: 300,
            useNativeDriver: true,        // Make it take a while
         }
      ).start();
      this.forceUpdate()
     console.log(this.state.activeEvent);
  }
  /**
   * If pressed on the map
   */
  onMapPress() {
     /**
      * Animate the hiding animation of the overlay
      */
     Animated.timing(                  // Animate over time
     this.state.slideAnim,            // The animated value to drive
        {
           toValue: .5*width,                   // Animate to opacity: 1 (opaque)
           duration: 300,
           useNativeDriver: true,        // Make it take a while
        }
     ).start();
 }
 /**
  * If the user leaves the map component.
  */
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _eventDetails() {
     if(this.state.activeEvent) {
        return (
           <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={20}
            style={MapsStyle.buttonScrollview}
            contentContainerStyle={MapsStyle.buttonScrollviewContainer}
         >
            {this.state.activeEvent.events.map((eventData,index) => (
             <TouchableOpacity
               onPress={(e)=>this.onItemPress(eventData.id)}
               key={index}
               style={[MapsStyle.button,this.state.activeEvent.events.length > 1 ? MapsStyle.buttonMultiple : '']}
             >
             <View style={[MapsStyle.buttonContent,]}>

            <Image source={{ uri: imgLink+eventData.thumb}} style={MapsStyle.buttonPhoto} />

               <View style={MapsStyle.overlay}/>
               <Text style={[General.h3,MapsStyle.buttonText]}>
                  {eventData.title}
               </Text>
             </View>
             </TouchableOpacity>
             ))}
          </ScrollView>

       )
    }
 }
     render() {
        var activeEvent = this.state.activeEvent !== null ? this.state.activeEvent : {key:null};
        console.log(this.state.marker);
       return (
         <View style ={MapsStyle.container}>
            <MapView
               style={MapsStyle.map}
               initialRegion={this.state.region}
               showsUserLocation={true}
               followUserLocation={true}
               loadingEnabled
               loadingIndicatorColor="#666666"
               loadingBackgroundColor="#eeeeee"
               showsMyLocationButton={true}
               showsPointsOfInterest={true}
               onPress={(e)=>this.onMapPress(e)}
               onRegionChange={this.onRegionChange.bind(this)}>

               {this.state.markers.map((marker,index) => (
                  <MapView.Marker.Animated
                  key={marker.key}
                  coordinate={marker.coordinate}
                  image={marker.key === activeEvent.key ? PointerActive : Pointer}
                  onPress={(e)=>this.onMarkerPress(e.nativeEvent,marker.key,marker.events)}
                  />
               ))}


            </MapView>
                  <Animated.View style={MapsStyle.buttonContainer, {
                     transform:[{translateY:  this.state.slideAnim}]
                  }}>
              {this._eventDetails()}
                  </Animated.View>
             </View>

       );
     }
   }
//image={flagPinkImg}
