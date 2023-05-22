// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCyQTXyOq9U4PvBT01NWTQrxbjxAGcXNhY',
  authDomain: 'whogetauth.firebaseapp.com',
  projectId: 'whogetauth',
  storageBucket: 'whogetauth.appspot.com',
  messagingSenderId: '676597152690',
  appId: '1:676597152690:web:17560cee6872d0b289c2ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
