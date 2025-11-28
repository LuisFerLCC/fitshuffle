import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgTt_D74614W221rFZcyIFJpz1RhfE2C0",
  authDomain: "ropitauwu-issc.firebaseapp.com",
  projectId: "ropitauwu-issc",
  storageBucket: "ropitauwu-issc.firebasestorage.app",
  messagingSenderId: "909221653254",
  appId: "1:909221653254:web:1566ce3c1598e6e99e8c87"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
