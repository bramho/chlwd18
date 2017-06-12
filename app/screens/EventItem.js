import React, { Component } from 'react';
import { StyleSheet, Text, Image, View,TextInput, Animated, ScrollView,TouchableOpacity, Button,Share, Dimensions, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';

import LoadingIcon from '../components/LoadingIcon';

import { statusBar } from '../helpers/StatusBar';
import Icon from '../helpers/Icons';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { setFavorite, checkFavorite, checkStorageKey, getStorageData } from '../helpers/Storage';
import { formatDate } from '../helpers/FormatDate';
import { openLink } from '../helpers/Links';
import { shareItem } from '../helpers/Share';

import { General, EventStyle, ComponentStyle, ListViewStyle, Tags, Buttons } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://www.vanplan.nl/viewapi/v1/agenda/lc/";

const imgLink = "https://www.vanplan.nl/contentfiles/";

var favorite;
var rowRefs;
var savedEventsIds;

/**
 * New initialisation of the EventItem datasource object
 */
export default class EventItem extends Component {
   constructor(props) {
      super(props);

      this.rowRefs = [];
      this.savedEventsIds = [];

      console.log(this.props);

      this.state = {
         data: '',
         isLoading: true,
         id: this.props.eventId,
         rowData: this.props.rowData,
         scrollY: new Animated.Value(0),
         addToFavorites: true,
         iconColor: COLOR.RED,
         iconName: 'heart',
      };
   }

   componentDidMount() {
      this.fetchData(this.state.id);

      statusBar('transparent');

      checkStorageKey('savedEvents').then((isValidKey) => {

         if (isValidKey) {
            getStorageData('savedEvents').then((data) => {
               savedEvents = JSON.parse(data);

               for (var i = 0; i < savedEvents.length; i++) {
                  this.savedEventsIds.push(savedEvents[i].id);

                  if (savedEvents[i].id === this.state.id) {
                     this.setState({
                        addToFavorites: false,
                        iconName: 'heart-fill',
                     })
                  }
               }

            });
         }
      });
   }

   storeRowRefs(rowRef) {
      this.rowRefs.push(rowRef);
   }

   shareEvent() {
      shareItem(
         this.state.data.title,
         this.state.data.social_url,
         this.state.data.title
      );
   }

   addOrRemoveFavorite (addToFavorites, savedEventsIds) {
      console.log('Add to favorites: ' + addToFavorites);
      console.log(this.state.rowData);

      setFavorite(this.state.rowData, addToFavorites, savedEventsIds);

      if (addToFavorites) {
         this.rowRefs[0].setNativeProps({
            style: {
               color: COLOR.RED,
            }
         });
         this.setState({
            addToFavorites: false,
            iconName: 'heart-fill'
         })
      } else {
         this.rowRefs[0].setNativeProps({
            style: {
               color: COLOR.RED,
            }
         });
         this.setState({
            addToFavorites: true,
            iconName: 'heart'
         })
      }
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData(id) {
      Api.getData(apiLink+id)
         .then((data) => {
            this.setState({
               data: data.result[0],
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

   openUrl(url) {
      Actions.webModal({url: url});
   }

   /**
    * Renders the Scrollview content, in this case the data from the events
    */
   _renderContent() {
      //Get dimensions of the device
      const {width, height, scale} = Dimensions.get("window");
      //Set animated header size
      const HEADER_MAX_HEIGHT = 60*(height/100);
      const HEADER_MIN_HEIGHT = 80;
      const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

      // Variables for carousel
      const deviceWidth = width - 40;
      const FIXED_BAR_WIDTH = deviceWidth;
      const BAR_SPACE = 10;
      const imgLink = "https://www.vanplan.nl/contentfiles/";
      var numItems = this.state.data.images.length;
      var itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
      var animVal = new Animated.Value(0);

      let imageArray = [];
      let barArray = [];

      this.state.data.images.forEach((image, i) => {
         const imageItem = (
            <Image
               key={`image${i}`}
               source={{uri: imgLink + image}}
               style={{width: deviceWidth, borderRadius: 4}}
            />
         )
         imageArray.push(imageItem);

         const scrollBarVal = animVal.interpolate({
            inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
            outputRange: [-itemWidth, itemWidth],
            extrapolate: 'clamp',
         })

         const barItem = (
            <View
               key={`bar${i}`}
               style={[
                  EventStyle.barContainer,
                  {
                     width: itemWidth,
                     marginLeft: i === 0 ? 0 : BAR_SPACE,
                  }
               ]}
            >
               <Animated.View
                  style={[
                     EventStyle.barOverlay,
                     {
                        width: itemWidth,
                        transform: [
                           { translateX: scrollBarVal },
                        ],
                     }
                  ]}
               />
            </View>
         )
         barArray.push(barItem);
      })

      // Calculate header height when scrolling
      const headerHeight = this.state.scrollY.interpolate({
         inputRange: [0, HEADER_SCROLL_DISTANCE],
         outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
         extrapolate: 'clamp',
      });

      // Calculate opacity when scrolling
      const imageOpacity = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      });

      // Calculate paralax image effect
      const imageTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      });

      return (
         <View style={[General.container,{marginBottom: 60, marginTop: -80 }]}>

            <Animated.View style={[EventStyle.favoriteButtonHolder, {marginTop: headerHeight, opacity: imageOpacity}]}>

               <TouchableOpacity style={[ComponentStyle.filterIconContainer]} onPress={function(){this.addOrRemoveFavorite(this.state.addToFavorites, this.savedEventsIds)}.bind(this)}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon ref={(ref) => this.storeRowRefs(ref)} name={this.state.iconName} size={25} color={this.state.iconColor} />
                  </View>
               </TouchableOpacity>

            </Animated.View>

         <ScrollView style={EventStyle.fill}
                  scrollEventThrottle={20}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
           )}>
            <View style={EventStyle.scrollViewContent}>
               <View style={EventStyle.section}>
                 <Text style={General.h3}>{this.state.data.title}</Text>
                 <Text style={[General.p, General.itemContent, {color: COLOR.MEDIUMGRAY}]}>{this.state.data.description}</Text>
               </View>

               <View style={[EventStyle.section, EventStyle.carouselContainer]}>
                  <ScrollView
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     scrollEventThrottle={10}
                     pagingEnabled
                     onScroll={
                        Animated.event(
                           [{ nativeEvent: { contentOffset: { x: animVal } } }]
                        )
                     }
                  >
                     {imageArray}
                  </ScrollView>

                  <View style={EventStyle.barHolder}>
                     {barArray}
                  </View>
               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('datesAndTimes')}</Text>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('dateText')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('fromText')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('untilText')}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={[ComponentStyle.tabelCellThree, General.grayText]}>{formatDate(this.state.data.startDate,'eventItemDate')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.rightText, General.blueText]}>{this.state.data.datetimes[0].startTime}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.redText, General.rightText, General.blueText]}>{this.state.data.datetimes[0].endTime}</Text>
                  </View>
               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('pricing')}</Text>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={ComponentStyle.tabelCellThree}></Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('regular')}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={[ComponentStyle.tabelCellThree, General.grayText]}>{getTranslation('adults')}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText, General.redText, General.blueText]}>€ {this.state.data.ticketUrls[0].price}</Text>
                  </View>

                  <View style={[Buttons.buttonContainer, Buttons.buttonRed]}>
                     <TouchableOpacity style={{padding: 2}} onPress={function(){this.openUrl(this.state.data.ticketUrls[0].url)}.bind(this)}>
                        <Text style={Buttons.buttonText}>{getTranslation('buyTickets')}</Text>
                     </TouchableOpacity>
                  </View>

               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('usefulLinks')}</Text>
                  <Text style={[General.linkText, {padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8}]} onPress={function(){this.openUrl(this.state.data.ticketUrls[0].url)}.bind(this)}>Tickets</Text>
               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>
                     {getTranslation('whereItIs')}
                  </Text>
               </View>

            </View>


         </ScrollView>
         <Animated.View style={[EventStyle.header,{height: headerHeight}]}>
            <View style={EventStyle.innerContainer}>

               <Animated.Image
                style={[EventStyle.backgroundImage,
                   {opacity: imageOpacity, transform: [{translateY: imageTranslate}]}
                ]}
                source={{uri: imgLink+this.state.data.images[0]}}
               />
              <Animated.View style={[EventStyle.overlay,{opacity: imageOpacity}]}/>
              <Animated.View style={[EventStyle.headerContent,{opacity: imageOpacity}]}>
                  <View style={EventStyle.priceContainer}>
                     <View style={EventStyle.innerPriceContainer}>
                        <Text style={[General.subTitle, EventStyle.headerText, EventStyle.price]}>
                           {"€" + this.state.data.ticketUrls[0].price}
                        </Text>
                     </View>
                  </View>

                  <View style={EventStyle.bottomHeaderContent}>
                     <Text style={[General.h1, EventStyle.headerText, EventStyle.title]}>
                        {this.state.data.title}
                     </Text>

                     <View style={Tags.categoriesContainer}>
                        <View style={[Tags.categoryItemContainer, Tags.culture]}>
                           <Text style={Tags.categoryItem}>
                              #{this.state.data.categories[0].name}
                           </Text>
                        </View>

                        <View>
                           <Text style={[General.subTitle, EventStyle.headerText, {marginTop: 2}]}>
                              {this.state.data.location}
                           </Text>
                        </View>
                     </View>
                  </View>

              </Animated.View>

            </View>
         </Animated.View>
         </View>
      );
   }
   /**
    * Renders the total view
    */
   render() {

      var currentView = (this.state.isLoading) ? <LoadingIcon /> :this._renderContent();

      return (
         <View style={General.container}>
            <View style={ComponentStyle.singleHeaderContainer}>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.backIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={25} color="#fff" />
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.singleFilterIconContainer]} onPress={function(){this.shareEvent()}.bind(this)}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="share" size={25} color="#fff" />
                  </View>
               </TouchableOpacity>
            </View>
            {currentView}
         </View>
      );
   }
}
