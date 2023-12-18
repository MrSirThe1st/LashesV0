import { initializeApp,} from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1OcQEw7E8Fhfkgj3mPDtVSRVw1sIMGig",
  authDomain: "lashes-6fc03.firebaseapp.com",
  projectId: "lashes-6fc03",
  storageBucket: "lashes-6fc03.appspot.com",
  messagingSenderId: "996268075911",
  appId: "1:996268075911:web:d867fd09a16f2b07d3c122",
  measurementId: "G-MEMS2PH6Q3",
};

// intitialization
export const FIREBASE_APP = initializeApp(firebaseConfig);

//authentication
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const GoogleAuth = new GoogleAuthProvider();

//storage
export const storage = getStorage(FIREBASE_APP);
export const storageRef = ref(storage);

export const imagesRef = ref(storage, "images");
export const thumbnailsRef = ref(imagesRef, "thumbnails");
export const profileRef = ref(imagesRef, "profile");
export const productsRef = ref(imagesRef, "products");
