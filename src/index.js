import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

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


// Signing Users up with Email and Password
const signupForm = document.querySelector('.signUp')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

//Logging Users in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('the user signed out')
    })
    .catch((err) => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user logged in:', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })
})