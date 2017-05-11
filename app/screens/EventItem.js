import React, { Component } from 'react';
import { StyleSheet, Text, Image, View,TextInput, Animated, ScrollView,TouchableOpacity, Button,Share, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { statusBar } from '../helpers/StatusBar';
import Icon from 'react-native-vector-icons/FontAwesome';

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
const apiLink = "https://eric-project.c4x.nl/api/events/";

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

      Actions.refresh({ rightTitle: <Icon name="share-alt" size={20} color='#fff' style={{padding: 20,  textAlign: 'center'}}></Icon>, onRight: function(){this.shareEvent()}.bind(this) })
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
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(false, savedEventsIds)}.bind(this)}><Icon name="heart" size={20} color="#F02C32" /></Text>
                  } else {
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(true, savedEventsIds)}.bind(this)}><Icon name="heart-o" size={20} color="#FFF" /></Text>
                  }
               } else {
                  if (index === -1) {
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(true, savedEventsIds)}.bind(this)}><Icon name="heart-o" size={20} color="#FFF" /></Text>
                  } else {
                     favorite = <Text style={EventStyle.favoriteButton} onPress={function(){this.addOrRemoveFavorite(false, savedEventsIds)}.bind(this)}><Icon name="heart" size={20} color="#F02C32" /></Text>
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

   buyTickets() {
      console.log('BUY TICKETS');
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
         <View style={[General.container,{marginBottom:60}]}>
         <ScrollView style={EventStyle.fill}
                  scrollEventThrottle={20}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
           )}>
            <View style={EventStyle.scrollViewContent}>
               <View style={EventStyle.section}>
                 <Text style={General.h3}>Zorg dat het veilig is.</Text>
                 <Text style={[General.p, General.itemContent]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                 <Text style={[General.p, General.itemContent]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('datesAndTimes')}</Text>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('dateText')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('fromText')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.rightText]}>{getTranslation('untilText')}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={ComponentStyle.tabelCellThree}>{formatDate(this.state.data.dateStart,'eventItemDate')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.rightText]}>{formatDate(this.state.data.dateStart,'eventItemTime')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.redText, General.rightText]}>{formatDate(this.state.data.dateEnd,'eventItemTime')}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>

                     <Text style={ComponentStyle.tabelCellThree}>{formatDate(this.state.data.dateStart,'eventItemDate')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.rightText]}>{formatDate(this.state.data.dateStart,'eventItemTime')}</Text>

                     <Text style={[ComponentStyle.tabelCellOne, General.boldText, General.redText, General.rightText]}>{formatDate(this.state.data.dateEnd,'eventItemTime')}</Text>
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
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText]}>€ {this.state.data.ticket_prices.adult}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText, General.redText]}>€ {this.state.data.ticket_prices.adult}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('kids')}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText]}>€ {this.state.data.ticket_prices.kids}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText, General.redText]}>€ {this.state.data.ticket_prices.kids}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('seniors')}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText]}>€ {this.state.data.ticket_prices.seniors}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText, General.redText]}>€ {this.state.data.ticket_prices.seniors}</Text>
                  </View>

                  <View style={[ComponentStyle.tabelRow, EventStyle.dateAndTimes]}>
                     <Text style={ComponentStyle.tabelCellThree}>{getTranslation('cjp')}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText]}>€ {this.state.data.ticket_prices.CJP}</Text>
                     <Text style={[ComponentStyle.tabelCellOne, General.rightText, General.boldText, General.redText]}>€ {this.state.data.ticket_prices.CJP}</Text>
                  </View>

                  <View style={[Buttons.buttonContainer, Buttons.buttonRed]}>
                     <TouchableOpacity style={{padding: 2}} onPress={function(){this.buyTickets()}}>
                        <Text style={Buttons.buttonText}>{getTranslation('buyTickets')}</Text>
                     </TouchableOpacity>
                  </View>

               </View>

               <View style={EventStyle.section}>
                  <Text style={General.h3}>{getTranslation('usefulLinks')}</Text>
                  <Text style={General.linkText} onPress={function(){this.openUrl(this.state.data.website)}.bind(this)}>{this.state.data.website}</Text>
                  <Text style={General.linkText} onPress={function(){this.openUrl(this.state.data.social_url)}.bind(this)}>{this.state.data.social_url}</Text>
               </View>

            </View>


         </ScrollView>
         <Animated.View style={[EventStyle.header,{height: headerHeight}]}>
            <View style={EventStyle.innerContainer}>

               <Animated.Image
                style={[EventStyle.backgroundImage,
                   {opacity: imageOpacity, transform: [{translateY: imageTranslate}]}
                ]}
                source={{uri: this.state.data.header_img_hdpi}}
               />
              <Animated.View style={[EventStyle.overlay,{opacity: imageOpacity}]}/>
              <Animated.View style={[EventStyle.headerContent,{opacity: imageOpacity}]}>
                  <View style={EventStyle.favoriteButtonContainer}>
                     {favorite}
                  </View>
                  <Text style={[General.h1,EventStyle.headerText, EventStyle.title]}>{this.state.data.title}</Text>
                  <View style={{flexDirection: 'row'}}>
                     <View>
                        <Text style={[General.subTitle, EventStyle.headerText]}>{
                           formatDate(this.state.data.dateStart,'eventItem')
                        }
                        </Text>
                     </View>

                     <View style={EventStyle.dotSeperatorContainer}>
                        <Text style={[General.subTitle, EventStyle.headerText, EventStyle.dotSeperator]}>•</Text>
                     </View>

                     <View>
                        <Text style={[General.subTitle, EventStyle.headerText]}>
                           Oldehoven
                        </Text>
                     </View>

                     <View style={EventStyle.dotSeperatorContainer}>
                        <Text style={[General.subTitle, EventStyle.headerText, EventStyle.dotSeperator]}>•</Text>
                     </View>

                     <View>
                        <Text style={[General.subTitle, EventStyle.headerText, EventStyle.headerCityText]}>
                           {this.state.data.city}
                        </Text>
                     </View>

                  </View>

                  <View style={Tags.categoriesContainer}>
                     <View style={[Tags.categoryItemContainer, Tags.dance]}>
                        <Text style={Tags.categoryItem}>
                           Dance
                        </Text>
                     </View>

                     <View style={[Tags.categoryItemContainer, Tags.culture]}>
                        <Text style={Tags.categoryItem}>
                           Cultuur
                        </Text>
                     </View>
                  </View>
                  <View style={EventStyle.bottomHeaderPrice}>
                     <Text style={[General.subTitle,EventStyle.headerText, EventStyle.price]}>{getTranslation('fromText') + " €"+this.state.data.ticket_prices.adult}</Text>
                  </View>

                  <View style={EventStyle.bottomHeaderTicket}>
                     <Text style={[General.subTitle,EventStyle.headerText, EventStyle.headerTicketLink]}><Icon name="chevron-down" size={14} color="#FFF" /> Tickets</Text>
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

      return currentView;
   }
}
