import Constants from 'expo-constants';

// get your local machine's IP 
const localhost = '10.72.30.211'
  //Constants.expoConfig?.hostUri?.split(':').shift() || 'localhost';

  const API_URL = `http://${localhost}:3001`;
  export default API_URL
