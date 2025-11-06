import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz0iwuewa7iU2LKlqmQAuUHuR5w68aqDc",
  authDomain: "employee-9b2e1.firebaseapp.com",
  projectId: "employee-9b2e1",
  storageBucket: "employee-9b2e1.appspot.com", 
  messagingSenderId: "24858763779",
  appId: "1:24858763779:web:a9451d760c6ba93abe6436",
  measurementId: "G-L4XSNSX5L0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
