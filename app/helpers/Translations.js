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
   },
   'nl-NL': {
      greeting: 'Hallo!',
      homePageTitle: 'WELKOM BIJ \n',
      homePageSubTitle: 'LWD2018',
      eventsMenuItem: 'Evenementen',
      newsMenuItem: 'Nieuws',
   },
   'pl': {
      greeting: 'Kurwa!'
   }
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
function getCurrentLocale() {
   return I18n.currentLocale();
}

/**
 * Sets the locale to language passed into the function
 * @param {[string]} country
 */
export function setLocale(country) {
   I18n.locale = country;
}
