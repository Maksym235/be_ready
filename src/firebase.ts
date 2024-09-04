// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIRE_API_KEY = import.meta.env.VITE_FIRE_API_KEY;
const FIRE_AUTH_DOMINAN = import.meta.env.VITE_FIRE_AUTH_DOMINAN;
const FIRE_PROJECT_ID = import.meta.env.VITE_FIRE_PROJECT_ID;
const FIRE_STORAGE_BUCKET = import.meta.env.VITE_FIRE_STORAGE_BUCKET;
const FIRE_MESSSAGING_SENDER_ID = import.meta.env
	.VITE_FIRE_MESSSAGING_SENDER_ID;
const FIRE_APP_ID = import.meta.env.VITE_FIRE_APP_ID;
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: FIRE_API_KEY,
	authDomain: FIRE_AUTH_DOMINAN,
	projectId: FIRE_PROJECT_ID,
	storageBucket: FIRE_STORAGE_BUCKET,
	messagingSenderId: FIRE_MESSSAGING_SENDER_ID,
	appId: FIRE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
