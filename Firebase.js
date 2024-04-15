<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
