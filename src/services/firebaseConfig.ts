// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKaL3ZkAAQWoHZfXNkKK8bPH78bxFgEkg',
  authDomain: 'elo-manager-dashboard.firebaseapp.com',
  projectId: 'elo-manager-dashboard',
  storageBucket: 'elo-manager-dashboard.firebasestorage.app',
  messagingSenderId: '312256487485',
  appId: '1:312256487485:web:4e476699107eeefaa3ca54',
  measurementId: 'G-T5BZ4Y8RTV',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const firestore = getFirestore(app);

export { app, auth, firestore };