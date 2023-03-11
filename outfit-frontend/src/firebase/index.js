// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your web app's Firebase configuration
  apiKey: 'AIzaSyBcFFJy1Sc-uogVW0-GcJAvmiyGn0wcwf4',
  authDomain: 'codingninjas-cc154.firebaseapp.com',
  projectId: 'codingninjas-cc154',
  storageBucket: 'codingninjas-cc154.appspot.com',
  messagingSenderId: '349453145759',
  appId: '1:349453145759:web:8ef2a049863da8a29cb4aa',
  measurementId: 'G-S5HPG9GV02',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
