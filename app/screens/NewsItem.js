import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TextInput, ScrollView,TouchableOpacity, Dimensions, Animated} from 'react-native';
import { Actions } from 'react-native-router-flux';

import LoadingIcon from '../components/LoadingIcon';

import Icon from '../helpers/Icons';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { formatDate } from '../helpers/FormatDate';
import { statusBar } from '../helpers/StatusBar';
import { shareItem } from '../helpers/Share';

import { General, NewsStyle, ComponentStyle, EventStyle } from '../assets/styles/General';

 const apiLink = "https://kh2018-acc.ndcmediagroep.nl/services/article/";
 const headers = {'Authorization': 'Basic bmRjOjJ0T01haGF3az8=' }

/**
 * New initialisation of the EventItem datasource object
 */
export default class EventItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         data: '',
         isLoading: true,
         id: this.props.newsId,
      };

   }

   componentDidMount() {
      console.log(apiLink+ this.state.id);
      this.fetchData(this.state.id);

      statusBar();

   }

   shareArticle() {
      shareItem(
         // this.state.data.title,
         // this.state.data.social_url,
         // this.state.data.title
         'Test Title',
         'https://google.com',
         'Test Title',
      );
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData(id) {
      Api.getData(apiLink+id, headers)
         .then((data) => {
            console.log(data);

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

         console.log(this.state.data);
   }
   /**
    * Renders the Scrollview content, in this case the data from the events
    */
   _renderContent() {
      // Variables for carousel
      const {width, height, scale} = Dimensions.get("window");
      const deviceWidth = width - 30;
      const images = [
         "../assets/images/lwd-image.jpg",
         "../assets/images/lwd-image.jpg",
         "../assets/images/lwd-image.jpg",
      ]
      const FIXED_BAR_WIDTH = deviceWidth;
      const BAR_SPACE = 10;
      const imgLink = "https://www.vanplan.nl/contentfiles/";
      var numItems = images.length;
      var itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
      var animVal = new Animated.Value(0);

      let imageArray = [];
      let barArray = [];

      images.forEach((image, i) => {
         const imageItem = (
            <Image
               key={`image${i}`}
               source={require('../assets/images/lwd-image.jpg')}
               style={{width: deviceWidth, height: 200, borderRadius: 4}}
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

      return (
         <ScrollView>
            <View style={[NewsStyle.scrollViewContent]}>
               <View style={{height: 200}}>
                  <Image source={require('../assets/images/lwd-image.jpg')} style={NewsStyle.backgroundImage} />
               </View>

               <View style={General.generalPadding}>
                  <Text style={General.h3}>{this.state.data.title}</Text>
                  <View style={NewsStyle.articleInfo}>
                     <Text style={NewsStyle.articleInfoText}><Icon name="clock" size={20} /></Text>
                     <Text style={NewsStyle.articleInfoText}> {this.state.data.readTimeInMinutes} {getTranslation('readLength')}</Text>
                  </View>
               </View>

               <View style={General.generalPadding}>
                  <Text style={[General.p, NewsStyle.contentText]}>{this.state.data.content}</Text>
               </View>

               <View style={[General.generalPadding, EventStyle.carouselContainer]}>
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
            </View>
         </ScrollView>
      );
   }
   /**
    * Renders the total view
    */
   render() {
      var currentView = (this.state.isLoading) ? <LoadingIcon /> :
         <View style={{flex:1}}>
         {this._renderContent()}
         </View>

      return (
         <View style={[General.container]}>
            <View style={[ComponentStyle.headerContainer, ComponentStyle.newsHeader]}>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.backIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={25} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={[ComponentStyle.filterIconContainer]} onPress={() => this.shareArticle()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="share" size={25} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>
            </View>
            {currentView}
         </View>

      )
   }
}
