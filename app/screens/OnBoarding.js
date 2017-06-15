import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Alert, Image,} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';
import { setStorageData, checkStorageKey } from '../helpers/Storage';

import { General, ComponentStyle } from '../assets/styles/General';

const ONBOARDING_STORAGE_KEY = 'onBoardingComplete';

class OnBoarding extends Component {

   constructor(props) {
      super(props)

      this.state = {

      }
   }

   /**
    * Jumps to next slide
    */
   jumpSlide() {
      this.refs.onBoardingSwiper.scrollBy(1);
   }

   /**
    * Sets storage key for completed onBoarding
    */
   completeOnBoarding = async () => {
      await checkStorageKey(ONBOARDING_STORAGE_KEY).then((isValidKey) => {
         if (!isValidKey) {
            setStorageData(ONBOARDING_STORAGE_KEY, true);
         }

         Actions.pop();
      });
   }

   render() {

      return (
         <View style={{position: 'relative'}}>
            <Swiper
               paginationStyle={ComponentStyle.onBoardingPagination}
               dotColor={COLOR.BLUEGRAY}
               loop={false}
               ref='onBoardingSwiper'
            >
               <View style={ComponentStyle.onBoardingSlide}>
                  <Image
                     source={require('../assets/images/find-events_ob.png')}
                     style={ComponentStyle.onBoardingImage}
                  />

                  <Text style={ComponentStyle.onBoardingText}>
                     Vind je evenementen!
                  </Text>
                  <Text style={ComponentStyle.onBoardingSubText}>
                     De uitspraak van het gerechtshof dat er strafrechtelijke vervolging moet worden ingesteld tegen.
                  </Text>

                  <TouchableOpacity style={ComponentStyle.onBoardingBtn} onPress={() => this.jumpSlide()}>
                     <Text style={ComponentStyle.onBoardingBtnText}>
                        Volgende
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={ComponentStyle.skipTextContainer} onPress={() => this.completeOnBoarding()}>
                     <Text style={ComponentStyle.skipText}>
                        Overslaan
                     </Text>
                  </TouchableOpacity>
               </View>

               <View style={ComponentStyle.onBoardingSlide}>
                  <Image
                     source={require('../assets/images/find-news_ob.png')}
                     style={ComponentStyle.onBoardingImage}
                  />

                  <Text style={ComponentStyle.onBoardingText}>
                     Vind nieuws omtrent LWD 2018
                  </Text>
                  <Text style={ComponentStyle.onBoardingSubText}>
                     De uitspraak van het gerechtshof dat er strafrechtelijke vervolging moet worden ingesteld tegen.
                  </Text>

                  <TouchableOpacity style={ComponentStyle.onBoardingBtn} onPress={() => this.jumpSlide()}>
                     <Text style={ComponentStyle.onBoardingBtnText}>
                        Volgende
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={ComponentStyle.skipTextContainer} onPress={() => this.completeOnBoarding()}>
                     <Text style={ComponentStyle.skipText}>
                        Overslaan
                     </Text>
                  </TouchableOpacity>
               </View>

               <View style={ComponentStyle.onBoardingSlide}>
                  <Image
                     source={require('../assets/images/save-events_ob.png')}
                     style={ComponentStyle.onBoardingImage}
                  />

                  <Text style={ComponentStyle.onBoardingText}>
                     Sla je favoriete evenementen op!
                  </Text>
                  <Text style={ComponentStyle.onBoardingSubText}>
                     De uitspraak van het gerechtshof dat er strafrechtelijke vervolging moet worden ingesteld tegen.
                  </Text>

                  <TouchableOpacity style={ComponentStyle.onBoardingBtn} onPress={() => this.completeOnBoarding()}>
                     <Text style={ComponentStyle.onBoardingBtnText}>
                        Ik begrijp het!
                     </Text>
                  </TouchableOpacity>
               </View>
            </Swiper>
         </View>
      )
   }
}

export default OnBoarding;
