import firebase from 'firebase';

// Enter firebase configuration details here
const firebaseConfig = firebase.initializeApp({
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      });

export {firebaseConfig as firebase}
