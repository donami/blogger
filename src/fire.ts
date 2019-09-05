import firebase from 'firebase'
// var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
//     apiKey: "unreadablestuff",
//     authDomain: "your-domain-name.firebaseapp.com",
//     databaseURL: "https://your-domain-name.firebaseio.com",
//     storageBucket: "your-domain-name.appspot.com",
//     messagingSenderId: "123123123123"
// };
const config = {
    apiKey: "AIzaSyDUT2czoCzlNTzVm00PznQ30lv4tOjwjzo",
    authDomain: "fir-797a4.firebaseapp.com",
    databaseURL: "https://fir-797a4.firebaseio.com",
    projectId: "fir-797a4",
    storageBucket: "",
    messagingSenderId: "316546696005",
    appId: "1:316546696005:web:82c2acd4d068b12b"
};
const fire = firebase.initializeApp(config);

export const db = firebase.firestore();

export default fire;