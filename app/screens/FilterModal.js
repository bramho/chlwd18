import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, WebView, Slider} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';

import { General, EventStyle, ComponentStyle, ListViewStyle, Tags, Buttons } from '../assets/styles/General';

const MAXPRICEVALUE = 230;

class FilterModal extends Component {

   constructor(props) {
      super(props)

      this.state = {
         maxPriceValue: props.maxPriceValue,
      }

   }

   /**
    * Goes one scene back and send new props with it
    */
   sendParams() {
      Actions.pop({refresh: {
         sort: 'date',
         from: '',
         until: '',
         minPrice: '',
         maxPrice: this.state.maxPriceValue,
      }})
   }

   /**
    * Resets all filter options
    */
   resetFilter() {
      this.setState({
         maxPriceValue: MAXPRICEVALUE,
      })
   }

   showPrice() {
      if (this.state.maxPriceValue === 0) {
         return getTranslation('free');
      } else {
         return '€ ' + this.state.maxPriceValue + ',-';
      }
   }


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
                  {getTranslation('searchFilter')}
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
                           <Text style={General.p}>{getTranslation('maxPrice')}</Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                           <Text style={[General.h3, General.rightText]}>{this.showPrice()}</Text>
                        </View>
                     </View>

                     <View style={{flex:1, flexDirection: 'column'}}>
                        <Slider
                           onValueChange={(value) => this.setState({maxPriceValue: value})}
                           maximumValue={MAXPRICEVALUE}
                           minimumValue={this.state.minPriceValue}
                           value={this.state.maxPriceValue}
                           step={1}
                        />
                     </View>
                  </View>
               </View>

               <View>
                  <View>
                     <Text style={{textAlign: 'center', color: 'rgba(56, 56, 56, 0.4)', textDecorationLine: 'underline'}} onPress={function(){this.resetFilter()}.bind(this)}>{getTranslation('resetFilter')}</Text>
                  </View>

                  <View style={[Buttons.buttonContainer, Buttons.buttonRed]}>
                     <TouchableOpacity style={{padding: 2}} onPress={function(){this.sendParams()}.bind(this)}>
                        <Text style={Buttons.buttonText}>{getTranslation('applyFilter')}</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ScrollView>

         </View>
      )
   }
}

export default FilterModal;
