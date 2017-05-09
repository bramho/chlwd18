import I18n from 'react-native-i18n';

I18n.fallbacks = true;

setDefaultLocale();

I18n.translations = {
   'en': {
      greeting: 'Hi!',
      homePageTitle: 'WELCOME TO \n',
      homePageSubTitle: 'LWD2018',
      eventsMenuItem: 'Events',
      newsMenuItem: 'News',
      favoritesMenuItem: 'My Events',
      searchTerm: 'Search...',
      month: {
         1: 'January',
         2: 'February',
         3: 'March',
         4: 'April',
         5: 'May',
         6: 'June',
         7: 'July',
         8: 'August',
         9: 'September',
         10: 'October',
         11: 'November',
         12: 'December',
      },
      addToFavorites: 'Add to favorites',
      removeFromFavorites: 'Remove from favorites',
      navBarBackTitle: 'Back',
      fromText: 'From',
      untilText: 'Until',
      dateText: 'Date',
      datesAndTimes: 'Date and times',
      pricing: 'Pricing',
      preSale: 'Pre-sale',
      regular: 'Regular',
      adults: 'Adults',
      kids: 'Kids',
      seniors: 'Seniors (65+)',
      cjp: 'CJP',
      readLength: 'minute read',
      buyTickets: 'Buy tickets',
      usefulLinks: 'Useful links',
   },
   'nl-NL': {
      greeting: 'Hallo!',
      homePageTitle: 'WELKOM BIJ \n',
      homePageSubTitle: 'LWD2018',
      eventsMenuItem: 'Evenementen',
      newsMenuItem: 'Nieuws',
      favoritesMenuItem: 'Mijn Evenementen',
      searchTerm: 'Zoeken...',
      month: {
         1: 'Januari',
         2: 'Februari',
         3: 'Maart',
         4: 'April',
         5: 'Mei',
         6: 'Juni',
         7: 'Juli',
         8: 'Augustus',
         9: 'September',
         10: 'Oktober',
         11: 'November',
         12: 'December',
      },
      addToFavorites: 'Voeg to aan favorieten',
      removeFromFavorites: 'Verwijderen uit favorieten',
      navBarBackTitle: 'Terug',
      fromText: 'Vanaf',
      untilText: 'Tot',
      dateText: 'Datum',
      datesAndTimes: 'Data en tijden',
      pricing: 'Prijzen',
      preSale: 'Voorverkoop',
      regular: 'Normaal',
      adults: 'Volwassenen',
      kids: 'Kinderen',
      seniors: '65 plus',
      cjp: 'CJP',
      readLength: 'minuten leeslengte',
      buyTickets: 'Bestel tickets',
      usefulLinks: 'Handige links',
   },
}

/**
 * Gets translation type for current locale and returns the result
 * @param  {[string]} translationType  'Word' to be translated
 * @return translation                 Returns the translation
 */
export function getTranslation(translationType) {
   return I18n.t(translationType);
}

/**
 * Sets the default locale to dutch for non dutch or english devices,
 * else sets the language to the device language
 */
function setDefaultLocale() {
   var language = getCurrentLocale();

   if (language === 'nl-NL' || language === 'en') {
      I18n.locale = language;
      // I18n.locale = 'nl-NL';
   } else {
      I18n.locale = 'nl-NL';
   }
}

/**
 * Gets the currentlocale and returns the value
 * @return currentLocale
 */
export function getCurrentLocale() {
   return I18n.currentLocale();
}

/**
 * Sets the locale to language passed into the function
 * @param {[string]} country
 */
export function setLocale(country) {
   I18n.locale = country;
}
