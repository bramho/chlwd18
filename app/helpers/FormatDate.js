import { getCurrentLocale } from '../helpers/Translations';

import * as moment from 'moment';
/**
 * Formats unix timestamp to human readable date format
*  @param  {intr}   timestamp unix timestamp
 * @param  {string} view      name of the view for selecting the correct format for the view
 * @return {string}             returns human readable format
 */
export function formatDate(timestamp, view) {
      // Create format object
      var format = '';

      // switch for selection the view
      switch (view) {

         case 'eventsList':
            //format = {month: 'long', day: 'numeric' };
            format = 'MMMM D'
         break;

         case 'eventItem':
            //format = {hour: 'numeric', minute:'numeric', month: 'long', day: 'numeric' };
            format = 'D MMMM HH:mm'
         break;

         case 'eventList-day':
            //format = {day: 'numeric'};
            format = 'D'
         break;

         case 'eventList-month':
            //format = {month: 'short'};
            format = 'MMM'
         break;

         default:
            //format = { weekday: 'long', hour: 'numeric',minute:'numeric', month: 'long', day: 'numeric' };
            format = 'D MMMM HH:mm'
      }
      // time object form te timestamp parameter
      //const time = new Date(timestamp*1000);
      // // Get local
      //const locale = getCurrentLocale();

      // Set output
      const output = moment.unix(timestamp).format(format);//moment('YYYY', false).format()

      return output;
}
