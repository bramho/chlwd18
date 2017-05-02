import { getCurrentLocale } from '../helpers/Translations';

/**
 * Formats unix timestamp to human readable date format
*  @param  {intr}   timestamp unix timestamp
 * @param  {string} view      name of the view for selecting the correct format for the view
 * @return {string}             returns human readable format
 */
export function formatDate(timestamp, view) {
      // Create format object
      var format = {};

      // switch for selection the view
      switch (view) {

         case 'eventsList':
            format = {month: 'long', day: 'numeric' };
         break;

         case 'eventItem':
            format = {hour: 'numeric', minute:'numeric', month: 'long', day: 'numeric' };
         break;

         case 'eventItem-day':
            format = {day: 'numeric'};
         break;

         case 'eventItem-month':
            format = {month: 'short'};
         break;

         default:
            format = { weekday: 'long', hour: 'numeric',minute:'numeric', month: 'long', day: 'numeric' };
      }
      // time object form te timestamp parameter
      const time = new Date(timestamp*1000);
      // Get local
      const locale = getCurrentLocale();
      // Set output
      const output = time.toLocaleDateString(locale,format);

      return output;
}
