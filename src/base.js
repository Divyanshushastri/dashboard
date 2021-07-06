import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: "1:90640201551:web:ac5650370c5baec1b0373a",
    measurementId: "G-0CV7MWYK3R"

})
export default app