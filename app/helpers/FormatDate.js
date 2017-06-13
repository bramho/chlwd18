import { getCurrentLocale } from '../helpers/Translations';

var moment = require('moment');

moment.updateLocale('nl', {
    months : [
        "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
        "Augustus", "September", "Oktober", "November", "December"
    ]
});
moment.locale('nl');
/**
 * Formats unix timestamp to human readable date format
*  @param  {intr}   timestamp unix timestamp
 * @param  {string} view      name of the view for selecting the correct format for the view
 * @return {string}             returns human readable format
 */
export function formatDate(date, view) {
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

         case 'eventItemDate':
            format = 'D MMMM'
         break;

         case 'eventItemTime':
            format = 'HH:mm'
         break;

         case 'eventList':
            //format = {day: 'numeric'};
            format = 'dddd D MMMM'
         break;

         case 'filterModal':
            format = 'DD MMMM YYYY'
         break;

         default:
            //format = { weekday: 'long', hour: 'numeric',minute:'numeric', month: 'long', day: 'numeric' };
            format = 'D MMMM HH:mm'
      }
      // time object form te timestamp parameter
      //const time = new Date(timestamp*1000);
      // // Get local
      const locale = getCurrentLocale();

      // Set output
      const output = moment(date).format(format);//moment('YYYY', false).format()

      return output;
}
