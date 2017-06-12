import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, WebView, Slider} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';

import { General, EventStyle, ComponentStyle, ListViewStyle, Tags, Buttons } from '../assets/styles/General';

class FilterModal extends Component {

   constructor(props) {
      super(props)

      this.state = {
         maxPriceValue: 230,
         minPriceValue: 0,
      }
   }

   // show or hide Modal based on 'hide' prop
   render() {
      return (
         <View style={General.container}>
            <View style={ComponentStyle.singleHeaderContainer}>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.backIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={[ComponentStyle.filterIcon, ComponentStyle.filterModalIcon]}>
                     <Icon name="back" size={25} color="#F02C32" />
                  </View>
               </TouchableOpacity>

               <Text style={[General.h4, {flex: 5}]}>
                  Zoeken / Filteren
               </Text>

               <View style={{flex: 4}}>

               </View>
            </View>

            <ScrollView
               style={EventStyle.fill}
               scrollEventThrottle={20}
            >
               <View>
                  <View style={{flex: 1,padding: 20}}>
                     <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                           <Text style={General.p}>Maximale Prijs</Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                           <Text style={[General.h3, General.rightText]}>€ {this.state.maxPriceValue},-</Text>
                        </View>
                     </View>

                     <View style={{flex:1, flexDirection: 'column'}}>
                        <Slider
                           onValueChange={(value) => this.setState({maxPriceValue: value})}
                           maximumValue={230}
                           minimumValue={this.state.minPriceValue}
                           value={this.state.maxPriceValue}
                           step={1}
                        />
                     </View>
                  </View>
               </View>

               <View>
                  <View style={{flex: 1,padding: 20}}>
                     <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                           <Text style={General.p}>Minimale Prijs</Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                           <Text style={[General.h3, General.rightText]}>€ {this.state.minPriceValue},-</Text>
                        </View>
                     </View>

                     <View style={{flex:1, flexDirection: 'column'}}>
                        <Slider
                           onValueChange={(value) => this.setState({minPriceValue: value})}
                           minimumValue={0}
                           maximumValue={this.state.maxPriceValue}
                           step={1}
                        />
                     </View>
                  </View>
               </View>

               <View>
                  <View style={[Buttons.buttonContainer, Buttons.buttonRed]}>
                     <TouchableOpacity style={{padding: 2}} onPress={function(){}}>
                        <Text style={Buttons.buttonText}>Filteren</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ScrollView>

         </View>
      )
   }
}

export default FilterModal;
