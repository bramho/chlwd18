import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { Scene,Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import { getTranslation, setLocale } from '../helpers/Translations.js';

import { General} from '../assets/styles/General';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default class Maps extends Component {
   constructor(props) {
      super(props);

      this.state = {
         mapRegion: null,
         lastLat: null,
         lastLong: null,
      };


   }
   componentDidMount() {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      });

  }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

     render() {
       const { region } = this.props;
       console.log(region);

       return (
         <View style ={General.container}>
           <MapView
             style={styles.map}
             
             showsUserLocation={true}
             followUserLocation={true}
             onRegionChange={this.onRegionChange.bind(this)}>
             <MapView.Marker
               coordinate={{
                 latitude: (this.state.lastLat + 0.00050) || -36.82339,
                 longitude: (this.state.lastLong + 0.00050) || -73.03569,
               }}>
               <View>
                 <Text style={{color: '#000'}}>
                   { this.state.lastLong } / { this.state.lastLat }
                 </Text>
               </View>
             </MapView.Marker>
           </MapView>
         </View>
       );
     }
   }
