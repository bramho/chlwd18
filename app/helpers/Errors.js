/**
 * Holds the list of errors and returns error requested by the component
 */
errors = {
   1: 'Geen resultaten',
   100: 'Er is iets misgegaan bij het ophalen van de evenementen.',
   200: 'Er is iets misgegaan bij het ophalen van het nieuws',
   300: 'Er is iets misgegaan bij het ophalen van jou favoriete evenementen',
}

/**
 * Returns requested error
 * @param  {number} errorNumber
 * @return {String}  Error Text
 */
export function getError(errorNumber) {
   return errors[errorNumber];
}
