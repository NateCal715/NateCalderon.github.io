import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    /*getDocs*/onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
 } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getDatabase,
  ref, set
} from 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_vZta6FIMoSPYkqhS2ljRjjEjAiQ6qxg",
  authDomain: "health-tracker-dbc6d.firebaseapp.com",
  projectId: "health-tracker-dbc6d",
  storageBucket: "health-tracker-dbc6d.appspot.com",
  messagingSenderId: "164968132870",
  appId: "1:164968132870:web:68aa1101d18ca26deeae87",
  measurementId: "G-W4LRQT3X59",
  databaseURL: "https://health-tracker-dbc6d-default-rtdb.firebaseio.com/"
};

// init firebase app
initializeApp(firebaseConfig)

// init firebase services
const db = getFirestore()
const auth = getAuth()
const database = getDatabase(app);

// authentication tutorials: user ref
const user = auth.currentUser

// firestore tutorials: collection ref
const colRef = collection(db, 'games')

// firestore tutorials: queries
const q = query(colRef, orderBy('createdAt'))


// firestore tutorials: get collection data
/*
getDocs(colRef)
  .then((snapshot) => {
    let games = []
    snapshot.docs.forEach((doc) => {
      games.push({ ...doc.data(), id: doc.id })
    })
    console.log(games)
  })
  .catch(err => {
    console.log(err.message)
  })
*/

// firestore tutorials: real time collection data
/*const unsubCol = onSnapshot(q, (snapshot) => {
    let games = []
    snapshot.docs.forEach((doc) => {
      games.push({ ...doc.data(), id: doc.id})
    })
    console.log(games)
  })
  

// firestore tutorials: adding documents 
/*const addGameForm = document.querySelector('.add')
addGameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  addDoc(colRef, {
    title: addGameForm.title.value,
    studio: addGameForm.studio.value, 
    createdAt: serverTimestamp()
  })
  .then(() => {
    addGameForm.reset()
  })
})*/


// firestore tutorials: deleting documents
/*const deleteGameForm = document.querySelector('.delete')
deleteGameForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'games', deleteGameForm.id.value)

  deleteDoc(docRef)
      .then(() => {
        deleteGameForm.reset()
      })
      
  })*/

// firestore tutorials: get a single document
/*const docRef = doc(db, 'games', 'gY6InZhbBSnwAbCxk2Y0')

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})*/

// firestore tutorials: updating a document
/*const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'games', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset
  })
})*/

// authentication tutorials: logging in and out
// const logoutButton = document.querySelector('.logoutButton')
// logoutButton.addEventListener('click', () => {
//  signOut(auth)
//    .then(() => {
//      console.log('the user signed out')
//    })
//    .catch((err) => {
//      console.log(err.message)
//    })
//})


// authentication tutorials: signing users up 
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value
//  const displayName = signupForm.displayName.value

  createUserWithEmailAndPassword(auth, email, password, /*displayName*/)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset()
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


// authentication tutorials: subscribing to auth changes
/*const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})*/


// authentication tutorials: unsubscribing from changes (auth & db)
/*const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})*/

// authentication tutorials: Get the currently signed in User
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// authentication tutorials: Get a user's profile

if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}

// authentication tutorials: Get a user's provider-specific profile information
if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
} 

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}