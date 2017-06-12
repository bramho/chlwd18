import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TextInput, ScrollView,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

import LoadingIcon from '../components/LoadingIcon';

import Icon from '../helpers/Icons';
import Api from '../helpers/Api';
import { getTranslation } from '../helpers/Translations';
import { formatDate } from '../helpers/FormatDate';
import { statusBar } from '../helpers/StatusBar';
import { shareItem } from '../helpers/Share';

import { General, NewsStyle, ComponentStyle } from '../assets/styles/General';

/**
 * Apilink for calling data for the listview
 */
const apiLink = "https://eric-project.c4x.nl/api/news/";

/**
 * New initialisation of the EventItem datasource object
 */
export default class EventItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         data: '',
         isLoading: true,
         id:this.props.newsId,
      };

   }

   componentDidMount() {
      this.fetchData(this.state.id);

      statusBar();

      Actions.refresh({
         rightTitle: <Icon name="share-alt" size={20} color='#F02C32' style={{padding: 20,  textAlign: 'center'}}></Icon>,
         onRight: function(){
            this.shareArticle()}.bind(this)
      })
   }

   shareArticle() {
      shareItem(
         this.state.data.title,
         this.state.data.social_url,
         this.state.data.title
      );
   }

   /**
    * Fetches data from Api and returns the result
    * @return [data] Data returned from Api
    */
   fetchData(id) {
      Api.getData(apiLink+id)
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
   }
   /**
    * Renders the Scrollview content, in this case the data from the events
    */
   _renderContent() {

      return (
         <ScrollView>
            <View style={[NewsStyle.scrollViewContent]}>
               <View style={General.generalPadding}>
                  <Text style={General.h1}>Minister veegt de vloer aan met falende Sionsbarg-top</Text>
                  <View style={NewsStyle.articleInfo}>
                     <Text style={NewsStyle.articleInfoText}><Icon name="clock" size={18} /> 5 {getTranslation('readLength')} • </Text>
                     <Text style={[NewsStyle.articleInfoText, NewsStyle.category]}>Friesland</Text>
                  </View>
               </View>
               <View style={NewsStyle.imageContainer}>
                  <Image style={NewsStyle.image} source={{uri: this.state.data.header_img}}/>
                     <Text style={NewsStyle.imageDescription}><Icon name="camera" size={20} /> Rob's paleis. FOTO ARCHIEF LC</Text>
               </View>
              <View style={General.generalPadding}>
                  <Text style={[General.p, NewsStyle.textSection]}>{this.state.data.body}</Text>
                  <Text style={[General.p, NewsStyle.textSection]}>{this.state.data.body}</Text>
                  <View style={NewsStyle.imageContainer}>
                     <Image style={NewsStyle.inlineImage} source={{uri: this.state.data.header_img}}/>
                        <Text style={NewsStyle.imageDescription}><Icon name="camera" size={20} /> Rob's paleis. FOTO ARCHIEF LC</Text>
                  </View>
                  <Text style={[General.h2, NewsStyle.textSection]}>Dit is een kop 2</Text>
                  <Text style={General.p}>{this.state.data.body}</Text>
                  <View style={NewsStyle.quoteContainer}>
                     <Text style={NewsStyle.quoteText}>
                        {'"'+this.state.data.body+'"'}
                     </Text>
                  </View>
                  <Text style={[General.p, NewsStyle.textSection]}>{this.state.data.body}</Text>
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
         <View style={[General.container, {marginBottom: 80}]}>
            <View style={ComponentStyle.singleHeaderContainer}>
               <TouchableOpacity style={[ComponentStyle.filterIconContainer, ComponentStyle.backIconContainer]}  onPress={function(){Actions.pop()}}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="back" size={25} color="#F02C32" />
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={[ComponentStyle.filterIconContainer]}>
                  <View style={ComponentStyle.filterIcon}>
                     <Icon name="share" size={25} color="#F02C32" />
                  </View>
               </TouchableOpacity>
            </View>
            {currentView}
         </View>

      )
   }
}
