import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAp5pSND5XtaRsFGiw-BEBV_SvPHaBbTTs",
  authDomain: "weather-tracker-react.firebaseapp.com",
  databaseURL: "https://weather-tracker-react-default-rtdb.firebaseio.com",
  projectId: "weather-tracker-react",
  storageBucket: "weather-tracker-react.appspot.com",
  messagingSenderId: "855323861780",
  appId: "1:855323861780:web:07836ef283beefb6e1d801",
  measurementId: "G-FDSXTX3SEB",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
