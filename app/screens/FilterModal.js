import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, WebView, Slider} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';
import { getStorageData, checkStorageKey } from '../helpers/Storage';

import { General, EventStyle, ComponentStyle, ListViewStyle, Tags, FilterStyles, Buttons } from '../assets/styles/General';

const MAXPRICEVALUE = 230;

const CATEGORIESURL = 'https://www.vanplan.nl/viewapi/v1/category/lc/';

var categoryList = '';
var categoriesArray = [];

class FilterModal extends Component {

   constructor(props) {
      super(props)

      this.state = {
         maxPriceValue: props.maxPriceValue,
         isLoading: true,
         hasCategories: false,
         apiData: '',
         currentCategoryId: props.categoryId,
         refIndex: '',
         testIndex: 4,
      }
   }

   componentDidMount() {
      this.getCategories().then(() => {
         this.setState({isLoading: false})
      })
   }

   /**
    * Goes one scene back and send new props with it
    */
   sendParams() {
      Actions.pop({refresh: {
         sort: 'date',
         from: '',
         until: '',
         maxPrice: this.state.maxPriceValue,
         categoryId: this.state.currentCategoryId
      }})
   }

   /**
    * Resets all filter options
    */
   resetFilter() {
      this.setState({
         maxPriceValue: MAXPRICEVALUE,
         currentCategoryId: '',
      })
   }

   /**
    * Gets all categories from cache
    * @return {JSON}    Categories data
    */
   getCategories = async () => {
      const STORAGEKEY = 'categoriesData';

      if(!this.state.isDone) {
         await checkStorageKey(STORAGEKEY).then((isValidKey) => {
            if (isValidKey) {
               getStorageData(STORAGEKEY).then((data) => {
                  this.setState({
                     hasCategories: true,
                     apiData: JSON.parse(data)
                  });
               });
            }
         });
      }
   }

   /**
    * Returns translation of 'Free' if price is 0, else returns the price number.
    * @return {string}    Price
    */
   showPrice() {
      if (this.state.maxPriceValue === 0) {
         return getTranslation('free');
      } else {
         return '€ ' + this.state.maxPriceValue + ',-';
      }
   }

   /**
    * Sets current category id in the state
    * @param {int} categoryId    Id of selected category
    */
   setCategory(categoryId) {
      this.setState({currentCategoryId: categoryId});
   }

   /**
    * Renders content for the filter modal
    * @return {ScrollView}    ScrollView with filter modal content
    */
   _renderContent() {

      if (this.state.hasCategories) {
         console.log(this.state.currentCategoryId);
         categoriesArray = [];
         this.state.apiData.map((data, index) => {
            categoriesArray.push(
               <TouchableHighlight key={index} style={this.state.currentCategoryId === this.state.apiData[index].id ? [FilterStyles.filterItemContainer, {backgroundColor:'#00f'}] : [FilterStyles.filterItemContainer, {backgroundColor:'#ff0'}]} onPress={() => this.setCategory(this.state.apiData[index].id)}>
                  <View style={FilterStyles.innerFilterItem}>
                     <Text>{this.state.apiData[index].name}</Text>
                  </View>
               </TouchableHighlight>
            )
         })

         console.log(categoriesArray);
      }

      return (
         <ScrollView
            style={EventStyle.fill}
            scrollEventThrottle={20}
         >
            <View>
               <View style={{flex: 1,padding: 20}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                     <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={[General.p, General.bold,]}>{getTranslation('maxPrice')}</Text>
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
               <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
               >

                  {categoriesArray}

               </ScrollView>
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
      );
   }

   render() {

      var currentView = (this.state.isLoading) ? <View style={{flex:1, backgroundColor: '#dddddd'}}><Text>Loading..</Text></View> : this._renderContent();

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

            {currentView}

         </View>
      )
   }
}

export default FilterModal;
