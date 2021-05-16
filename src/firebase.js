import firebase from 'firebase'



const firebaseConfig = {
    apiKey: "AIzaSyBkpFWLnz_-6uw2czfTGSUcLnGW4qiXzQA",
    authDomain: "movieapp-ranjith-hackthon.firebaseapp.com",
    projectId: "movieapp-ranjith-hackthon",
    storageBucket: "movieapp-ranjith-hackthon.appspot.com",
    messagingSenderId: "40118120340",
    appId: "1:40118120340:web:ff80b7b58d4a4645392981",
    measurementId: "G-V4V3DQ3P3V"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {auth};
  export default db; 