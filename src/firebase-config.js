import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import REACT_APP_AUTH_KEY from "./.env.local"


const firebaseConfig = {
  apiKey: "",
    authDomain: "story-of-my-life-d0220.firebaseapp.com",
  // databaseURL:"gs://story-of-my-life-d0220.appspot.com",
  projectId: "story-of-my-life-d0220",
  storageBucket: "story-of-my-life-d0220.appspot.com",
  messagingSenderId: "877787444849",
  appId: "1:877787444849:web:c7d64cfb73ef3f2e268dd0",
  measurementId: "G-2SEL4G7319"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const dbReal = getDatabase(app);
