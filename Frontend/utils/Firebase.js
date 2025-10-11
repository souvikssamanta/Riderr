
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "riderr-c9e4f.firebaseapp.com",
  projectId: "riderr-c9e4f",
  storageBucket: "riderr-c9e4f.firebasestorage.app",
  messagingSenderId: "376185746842",
  appId: "1:376185746842:web:6bd1a62300ff57547ab623",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export { auth, provider };

