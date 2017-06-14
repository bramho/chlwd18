import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Alert, Image,} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';
import { setStorageData, checkStorageKey } from '../helpers/Storage';

import { General, SettingsStyles, ComponentStyle, FilterStyles } from '../assets/styles/General';

const styles = StyleSheet.create({
   slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.WHITE,
      paddingLeft: 25,
      paddingRight: 25,
   },
   pagination: {
     paddingBottom: 175,
   },
   image: {
      position: 'absolute',
      top: 80,
   },
   text: {
      fontFamily: 'Muli-Regular',
      fontSize: 16,
      color: COLOR.DARK,
   },
   subText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 12,
      lineHeight: 22,
      color: COLOR.MEDIUMGRAY,
      textAlign: 'center',
      marginTop: 8,
   },
   button: {
      padding: 10,
      minWidth: 220,
      backgroundColor: COLOR.RED,
      borderRadius: 8,
      position: 'absolute',
      bottom: 65,
   },
   buttonText: {
      fontFamily: 'Muli-Regular',
      fontSize: 14,
      color: COLOR.WHITE,
      textAlign: 'center',
   },
   skipTextContainer: {
      position: 'absolute',
      bottom: 24,
   },
   skipText: {
      fontFamily: 'HindSiliguri-Regular',
      fontSize: 12,
      color: COLOR.BLACK40,
      textDecorationLine: 'underline',
   },
});

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
               paginationStyle={styles.pagination}
               dotColor={COLOR.BLUEGRAY}
               loop={false}
               ref='onBoardingSwiper'
            >
               <View style={styles.slide}>
                  <Image
                     source={require('../assets/images/find-events_ob.png')}
                     style={styles.image}
                  />

                  <Text style={styles.text}>
                     Vind je evenementen!
                  </Text>
                  <Text style={styles.subText}>
                     De uitspraak van het gerechtshof dat er strafrechtelijke vervolging moet worden ingesteld tegen.
                  </Text>

                  <TouchableOpacity style={styles.button} onPress={() => this.jumpSlide()}>
                     <Text style={styles.buttonText}>
                        Volgende
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.skipTextContainer} onPress={() => this.completeOnBoarding()}>
                     <Text style={styles.skipText}>
                        Overslaan
                     </Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.slide}>
                  <Image
                     source={require('../assets/images/find-news_ob.png')}
                     style={styles.image}
                  />

                  <Text style={styles.text}>
                     Vind nieuws omtrent LWD 2018
                  </Text>
                  <Text style={styles.subText}>
                     De uitspraak van het gerechtshof dat er strafrechtelijke vervolging moet worden ingesteld tegen.
                  </Text>

                  <TouchableOpacity style={styles.button} onPress={() => this.jumpSlide()}>
                     <Text style={styles.buttonText}>
                        Volgende
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.skipTextContainer} onPress={() => this.completeOnBoarding()}>
                     <Text style={styles.skipText}>
                        Overslaan
                     </Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.slide}>
                  <Image
                     source={require('../assets/images/save-events_ob.png')}
                     style={styles.image}
                  />

                  <Text style={styles.text}>
                     Sla je favoriete evenementen op!
                  </Text>
                  <Text style={styles.subText}>
                     De uitspraak van het gerechtshof dat er strafrechtelijke vervolging moet worden ingesteld tegen.
                  </Text>

                  <TouchableOpacity style={styles.button} onPress={() => this.completeOnBoarding()}>
                     <Text style={styles.buttonText}>
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
