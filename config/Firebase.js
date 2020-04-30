import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA6YhEixJ3lQ1Ic63kWv7w970t5WBnb71c',
  authDomain: 'glookobuddy-frddnv.firebaseapp.com',
  databaseURL: 'https://glookobuddy-frddnv.firebaseio.com',
  projectId: 'glookobuddy-frddnv',
  storageBucket: 'glookobuddy-frddnv.appspot.com',
  messagingSenderId: '608968999200',
  appId: '1:608968999200:web:96d76237a09ea673a7d745',
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
