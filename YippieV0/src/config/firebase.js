import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, getDocs} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA1OcQEw7E8Fhfkgj3mPDtVSRVw1sIMGig",
  authDomain: "lashes-6fc03.firebaseapp.com",
  projectId: "lashes-6fc03",
  storageBucket: "lashes-6fc03.appspot.com",
  messagingSenderId: "996268075911",
  appId: "1:996268075911:web:d867fd09a16f2b07d3c122",
  measurementId: "G-MEMS2PH6Q3"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)



// collection



