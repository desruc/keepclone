import { initializeApp } from 'firebase/app';

const firebaseConfig = JSON.parse(window.atob(process.env.FIREBASE_CONFIG_B64));

export default initializeApp(firebaseConfig);
