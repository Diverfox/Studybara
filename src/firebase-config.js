import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2it-C8T7lMolUfxTmaGl_4_eS5Q0OqAo",
  authDomain: "studibara.firebaseapp.com",
  projectId: "studibara",
  storageBucket: "studibara.appspot.com",
  messagingSenderId: "1094379247704",
  appId: "1:1094379247704:web:a0bef7143d2c327879522d",
  measurementId: "G-YGW3DJRVWF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
