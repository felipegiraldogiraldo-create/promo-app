import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemo-ReplaceWithReal",
  authDomain: "promo-app-demo.firebaseapp.com",
  projectId: "promo-app-demo",
  storageBucket: "promo-app-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
