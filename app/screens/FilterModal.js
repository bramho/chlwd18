import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, WebView, Slider, DatePickerIOS, Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
var moment = require('moment');

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';
import { getStorageData, checkStorageKey } from '../helpers/Storage';
import { formatDate } from '../helpers/FormatDate';

import { General, EventStyle, ComponentStyle, ListViewStyle, Tags, FilterStyles, Buttons } from '../assets/styles/General';
COLOR = require('../assets/styles/COLOR');

const MAXPRICEVALUE = 230;

const CATEGORIESURL = 'https://www.vanplan.nl/viewapi/v1/category/lc/';

var categoryList = '';
var categoriesArray = [];

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var untilDate = new Date(year + 2, month, day);

class FilterModal extends Component {

   static defaultProps = {
      date: date,
      untilDate: untilDate,
   }

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
         isSiding: false,
         date: this.props.date,
         untilDate: this.props.untilDate,
         showDatePicker: false,
         showUntilDatePicker: false,
      }
   }

   componentDidMount() {
      this.getCategories().then(() => {
         this.setState({isLoading: false})
      })
   }

   /**
    * Sets date state to selected date
    * @param  {date}    Selected date
    */
   onDateChange = (date) => {
      this.setState({date: date});
   };

   /**
    * Sets untilDate state to selected date
    * @param  {date}    Selected date
    */
   onUntilDateChange = (date) => {
      this.setState({untilDate: date});
   };

   toggleFromDate() {
      if (this.state.showDatePicker) {
         this.setState({showDatePicker: false})
      } else {
         this.setState({showUntilDatePicker: false, showDatePicker: true})
      }
   }

   toggleUntilDate() {
      if (this.state.showUntilDatePicker) {
         this.setState({showUntilDatePicker: false})
      } else {
         this.setState({showDatePicker: false, showUntilDatePicker: true})
      }
   }

   /**
    * Goes one scene back and send new props with it
    */
   sendParams() {
      Actions.pop({refresh: {
         isFilter: true,
         sort: 'date',
         from: this.state.date,
         until: this.state.untilDate,
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
         isSliding: false,
         date: date,
         untilDate: untilDate
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


      if (this.state.hasCategories && !this.state.isSliding) {

         categoriesArray = [];
         this.state.apiData.map((data, index) => {

            var active = (this.state.currentCategoryId === this.state.apiData[index].id) ? true : false;

            categoriesArray.push(
               <TouchableHighlight underlayColor='transparent' key={index} style={FilterStyles.filterItemContainer} onPress={() => this.setCategory(this.state.apiData[index].id)}>
                  <View style={active ? [FilterStyles.innerFilterItem, FilterStyles.innerFilterBorderBlue] : [FilterStyles.innerFilterItem, FilterStyles.innerFilterBorderGray]}>
                     <View style={FilterStyles.itemIconContainer}>
                        <Icon name="search" size={30} color={active ? COLOR.LIGHTBLUE : COLOR.GRAY} />
                     </View>
                     <Text style={active ? [FilterStyles.itemText, FilterStyles.itemTextColorBlue] : [FilterStyles.itemText, FilterStyles.itemTextColorGray]}>{this.state.apiData[index].name}</Text>
                  </View>
               </TouchableHighlight>
            )
         })
      }

      if (!this.state.isSliding) {
         if (Platform.OS === 'ios') {
            var showDatePicker = this.state.showDatePicker ? <DatePickerIOS date={this.state.date} mode="date" onDateChange={this.onDateChange} minimumDate={this.state.date} maximumDate={this.state.untilDate} /> : <View></View>

            var showUntilDatePicker = this.state.showUntilDatePicker ? <DatePickerIOS date={this.state.untilDate} mode="date" onDateChange={this.onUntilDateChange} minimumDate={this.state.date} /> : <View></View>
         } else if (Platform.OS === 'android') {
            // CODE FOR ANDROID HERE
         }
      }

      return (
         <ScrollView
            style={[EventStyle.fill, {marginBottom: 70}]}
            scrollEventThrottle={20}
         >
            <View>
               <View style={[General.container, FilterStyles.innerFilterContainer]}>
                  <View style={FilterStyles.innerFilterRow}>
                     <View style={FilterStyles.innerFilterColumn}>
                        <Text style={[General.p]}>{getTranslation('maxPrice')}</Text>
                     </View>

                     <View style={FilterStyles.innerFilterColumn}>
                        <Text style={[General.h3, General.rightText]}>{this.showPrice()}</Text>
                     </View>
                  </View>

                  <View style={FilterStyles.innerFilterColumn}>
                     <Slider
                        onValueChange={(value) => this.setState({maxPriceValue: value, isSliding: true})}
                        maximumValue={MAXPRICEVALUE}
                        minimumValue={this.state.minPriceValue}
                        value={this.state.maxPriceValue}
                        step={5}
                        onSlidingComplete={() => this.setState({isSliding: false})}
                     />
                  </View>
               </View>
            </View>

            <View>
               <Text style={[General.p, {paddingLeft: 20, marginBottom: 0}]}>{getTranslation('selectCategories')}</Text>
               <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={FilterStyles.scollViewContainer}
               >

                  {categoriesArray}

               </ScrollView>
            </View>

            <View style={{padding: 20}}>
               <Text style={[General.p, {marginBottom: 0}]}>Van</Text>
               <View style={[FilterStyles.innerFilterRow]}>
                  <TouchableOpacity onPress={() => this.toggleFromDate()} style={FilterStyles.innerFilterColumn}>
                     <View style={FilterStyles.selectDateButton}>
                        <View style={FilterStyles.selectButtonLeftSide}>
                           <Text style={General.centerText}>{formatDate(this.state.date,'filterModal')}</Text>
                        </View>
                        <View style={FilterStyles.selectButtonRightSide}>
                           <Text style={FilterStyles.selectButtonIcon}>^</Text>
                        </View>
                     </View>
                  </TouchableOpacity>

               </View>

               <View>
                  {showDatePicker}
               </View>

               <Text style={[General.p, {marginBottom: 0, marginTop: 10}]}>Tot</Text>
               <View style={[FilterStyles.innerFilterRow]}>
                  <TouchableOpacity onPress={() => this.toggleUntilDate()} style={FilterStyles.innerFilterColumn}>
                     <View style={FilterStyles.selectDateButton}>
                        <View style={FilterStyles.selectButtonLeftSide}>
                           <Text style={General.centerText}>{formatDate(this.state.untilDate,'filterModal')}</Text>
                        </View>
                        <View style={FilterStyles.selectButtonRightSide}>
                           <Text style={FilterStyles.selectButtonIcon}>^</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>

               <View>
                  {showUntilDatePicker}
               </View>
            </View>

            <View>
               <View>
                  <Text style={FilterStyles.resetText} onPress={function(){this.resetFilter()}.bind(this)}>{getTranslation('resetFilter')}</Text>
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
