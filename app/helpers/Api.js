/**
 * Gets data from API and retuns the response.
 * @param  {[type]} api 	   Link to API
 * @return [type]             Returns data fetched from API
 */
export default Api = {
   getData(url,headers = {}) {
		return fetch(url,headers).then((response) => response.json());
  	}
}
