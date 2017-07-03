import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from '../helpers/Icons';
import { getTranslation } from '../helpers/Translations';

import { General, SettingsStyles, ComponentStyle, FilterStyles } from '../assets/styles/General';

class DevelopmentBy extends Component {

   constructor(props) {
      super(props)

      this.state = {
         url: this.props.url
      }
   }

   // show or hide Modal based on 'hide' prop
   render() {
      return (
         <View>
            <View style={ComponentStyle.headerContainer}>
               <TouchableOpacity style={ComponentStyle.filterIconContainer} onPress={() => Actions.pop()}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={25} color={COLOR.WHITE} />
                  </View>
               </TouchableOpacity>

               <View style={ComponentStyle.headerTitleContainer}>
                  <Text style={[General.h2, ComponentStyle.headerTitle]}>
                     {getTranslation('developedBy')}
                  </Text>
               </View>

               <View style={ComponentStyle.filterIconContainer}>
               </View>
            </View>

            <ScrollView style={[General.generalPadding]}>
               <View style={{paddingBottom: 150}}>

                  <TouchableOpacity style={SettingsStyles.itemContainer} onPress={() => Actions.pop()}>
                     <Text style={SettingsStyles.itemText}>{getTranslation('backToSettings')}</Text>
                     <Icon name="back" size={20} color={COLOR.BLUE} style={SettingsStyles.itemIcon} />
                  </TouchableOpacity>

                  <View style={SettingsStyles.textBlock}>
                     <Text style={SettingsStyles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </Text>
                  </View>

                  <View style={SettingsStyles.imageBlock}>
                     <Image
                        source={require('../assets/images/NDC_mediagroep.jpg')}
                        style={SettingsStyles.image}
                     />
                  </View>

                  <View style={SettingsStyles.textBlock}>
                     <Text style={SettingsStyles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </Text>
                  </View>

                  <View style={SettingsStyles.textBlock}>
                     <View style={SettingsStyles.itemContainer}>
                        <View style={SettingsStyles.developerImgContainer}>
                           <Image source={require('../assets/images/NDC_mediagroep.jpg')}
                              style={SettingsStyles.developerImg} />
                        </View>
                        <Text style={SettingsStyles.developerText}>Rob Scholten, Lead Designer</Text>
                     </View>

                     <View style={SettingsStyles.itemContainer}>
                        <View style={SettingsStyles.developerImgContainer}>
                           <Image source={require('../assets/images/NDC_mediagroep.jpg')}
                              style={SettingsStyles.developerImg} />
                        </View>
                        <Text style={SettingsStyles.developerText}>Peter de Vries, Designer</Text>
                     </View>

                     <View style={SettingsStyles.itemContainer}>
                        <View style={SettingsStyles.developerImgContainer}>
                           <Image source={require('../assets/images/NDC_mediagroep.jpg')}
                              style={SettingsStyles.developerImg} />
                        </View>
                        <Text style={SettingsStyles.developerText}>Mauro Sasso, Designer</Text>
                     </View>

                     <View style={SettingsStyles.itemContainer}>
                        <View style={SettingsStyles.developerImgContainer}>
                           <Image source={require('../assets/images/NDC_mediagroep.jpg')}
                              style={SettingsStyles.developerImg} />
                        </View>
                        <Text style={SettingsStyles.developerText}>Bram Honingh, Lead Developer iOS</Text>
                     </View>

                     <View style={SettingsStyles.itemContainer}>
                        <View style={SettingsStyles.developerImgContainer}>
                           <Image source={require('../assets/images/NDC_mediagroep.jpg')}
                              style={SettingsStyles.developerImg} />
                        </View>
                        <Text style={SettingsStyles.developerText}>Eric Fennis, Lead Developer Android</Text>
                     </View>
                  </View>

               </View>
            </ScrollView>
         </View>
      )
   }
}

export default DevelopmentBy;
