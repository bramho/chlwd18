import React, { Component } from 'react';
import { StyleSheet, Text, Image, View,TextInput, Animated, ScrollView,TouchableOpacity, Button,Share, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
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

var test =  <View style={ComponentStyle.shareIconContainer}>
               <Text style={ComponentStyle.shareIcon}>F</Text>
            </View>;

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
         rowData: this.props.rowData,
         scrollY: new Animated.Value(0),

      };

      console.log(this.props.eventId);
   }

   componentDidMount() {
      this.fetchData(this.state.id);

      this.setFavoriteButton(false);
      statusBar('transparent');

      Actions.refresh({ rightTitle: <Icon name="share" size={20} color='#fff' style={{padding: 20,  textAlign: 'center'}}></Icon>, onRight: function(){this.shareEvent()}.bind(this) })
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
      setFavorite(this.state.rowData, addToFavorites, savedEventsIds);
      this.setFavoriteButton(true);
   }

   setFavoriteButton(isReset) {


      checkStorageKey('savedEvents').then((isValidKey) => {

         if (isValidKey) {
            getStorageData('savedEvents').then((data) => {
               savedEvents = JSON.parse(data);

               var savedEventsIds = [];

               for (var i = 0; i < savedEvents.length; i++) {
                  savedEventsIds.push(savedEvents[i].id);
               }

               console.log('Saved Event Ids:');
               console.log(savedEventsIds);

               var index = savedEventsIds.indexOf(this.state.id);

               if(isReset) {
                  if (index === -1) {
                     // return Actions.refresh({ rightTitle: getTranslation('removeFromFavorites'), onRight: function(){this.addOrRemoveFavorite(false, savedEventsIds)}.bind(this) })
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(false, savedEventsIds)}.bind(this)}><Icon name="heart-fill" size={20} color="#F02C32" /></Text>
                  } else {
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(true, savedEventsIds)}.bind(this)}><Icon name="heart" size={20} color="#FFF" /></Text>
                  }
               } else {
                  if (index === -1) {
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(true, savedEventsIds)}.bind(this)}><Icon name="heart" size={20} color="#FFF" /></Text>
                  } else {
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(false, savedEventsIds)}.bind(this)}><Icon name="heart-fill" size={20} color="#F02C32" /></Text>
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

   buyTickets(url) {
      openLink(url)
   }

   openUrl(url) {
      openLink(url);
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

         <ScrollView style={EventStyle.fill}
                  scrollEventThrottle={20}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
           )}>
            <View style={EventStyle.scrollViewContent}>
               <View style={EventStyle.section}>
                 <Text style={General.h3}>{this.state.data.title}</Text>
                 <Text style={[General.p, General.itemContent]}>{this.state.data.description}</Text>
               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('datesAndTimes')}</Text>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('dateText')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('fromText')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('untilText')}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={ComponentStyle.tabelCellThree}>{formatDate(this.state.data.startDate,'eventItemDate')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.rightText]}>{this.state.data.datetimes[0].startTime}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.redText, General.rightText]}>{this.state.data.datetimes[0].endTime}</Text>
                  </View>
               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('pricing')}</Text>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={ComponentStyle.tabelCellThree}></Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('preSale')}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('regular')}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('adults')}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText]}>€ {this.state.data.ticketUrls[0].price}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText, General.redText]}>€ {this.state.data.ticketUrls[0].price}</Text>
                  </View>

                  <View style={[Buttons.buttonContainer, Buttons.buttonRed]}>
                     <TouchableOpacity style={{padding: 2}} onPress={function(){this.buyTickets(this.state.data.ticketUrls[0].url)}.bind(this)}>
                        <Text style={Buttons.buttonText}>{getTranslation('buyTickets')}</Text>
                     </TouchableOpacity>
                  </View>

               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('usefulLinks')}</Text>
                  <Text style={General.linkText} onPress={function(){this.openUrl(this.state.data.ticketUrls[0].url)}.bind(this)}>Tickets</Text>
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
                  <View style={EventStyle.favoriteButtonContainer}>
                     {favorite}
                  </View>
                  <Text style={[General.h1,EventStyle.headerText, EventStyle.title]}>{this.state.data.title}</Text>
                  <View style={{flexDirection: 'row'}}>
                     <View>
                        <Text style={[General.subTitle, EventStyle.headerText]}>
                           {this.state.data.subtitle}
                        </Text>
                     </View>

                  </View>

                  <View style={Tags.categoriesContainer}>
                     <View style={[Tags.categoryItemContainer, Tags.culture]}>
                        <Text style={Tags.categoryItem}>
                           {this.state.data.categories[0].name}
                        </Text>
                     </View>
                  </View>
                  <View style={EventStyle.bottomHeaderPrice}>
                     <Text style={[General.subTitle,EventStyle.headerText, EventStyle.price]}>{getTranslation('fromText') + " €"+this.state.data.ticketUrls[0].price}</Text>
                  </View>

                  <View style={EventStyle.bottomHeaderTicket}>
                     <Text style={[General.subTitle,EventStyle.headerText, EventStyle.headerTicketLink]}><Icon name="down" size={14} color="#FFF" /> Tickets</Text>
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

      var currentView = (this.state.isLoading) ? <View style={{flex:1, backgroundColor: '#dddddd'}}><Text>Loading..</Text></View> :this._renderContent();

      return (
         <View style={General.container}>
            <View style={ComponentStyle.singleHeaderContainer}>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.backIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={25} color="#fff" />
                  </View>
               </TouchableOpacity>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="heart" size={25} color="#fff" />
                  </View>
               </TouchableOpacity>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.singleFilterIconContainer]}>
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
