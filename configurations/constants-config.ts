  import Constants from 'expo-constants';
  // get your local machine's IP 
  const localhost = '10.72.30.211'
  const API_URL = 
  Constants.expoConfig?.extra?.API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  `http://${localhost}:3001`;
  //const API_URL = `http://${localhost}:3001`;
  console.log('API_URL:', API_URL);
  export default API_URL
