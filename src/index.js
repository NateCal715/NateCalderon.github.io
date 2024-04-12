import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_vZta6FIMoSPYkqhS2ljRjjEjAiQ6qxg",
    authDomain: "health-tracker-dbc6d.firebaseapp.com",
    projectId: "health-tracker-dbc6d",
    storageBucket: "health-tracker-dbc6d.appspot.com",
    messagingSenderId: "164968132870",
    appId: "1:164968132870:web:68aa1101d18ca26deeae87",
    measurementId: "G-W4LRQT3X59"
  };
  
  //init firebase app
  initializeApp(firebaseConfig);

// init firebase services
const auth = getAuth()