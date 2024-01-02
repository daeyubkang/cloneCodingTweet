import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuuP_9JXJeVH2brM0fPb9E9HATbdxP36E",
  authDomain: "clonetweet-fd9be.firebaseapp.com",
  projectId: "clonetweet-fd9be",
  storageBucket: "clonetweet-fd9be.appspot.com",
  messagingSenderId: "760452847474",
  appId: "1:760452847474:web:729db807ff186f09fdafeb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
