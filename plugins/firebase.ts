import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Plugin } from '@nuxt/types';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZNfaNgtCAUBrnP4NLHYy7nIvI9ewvMV0',
  authDomain: 'cms-app-8d873.firebaseapp.com',
  projectId: 'cms-app-8d873',
  storageBucket: 'cms-app-8d873.appspot.com',
  messagingSenderId: '911353780489',
  appId: '1:911353780489:web:61fef7a2270381397fdbd8',
  measurementId: 'G-2CV2DBS4KF'
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(firebaseApp);
const firebaseAuth = getAuth();
const firebasePlugin: Plugin = (_context, inject) => {
  inject('firebaseApp', firebaseApp);
  inject('fireStoreDb', fireStoreDb);
  inject('firebaseAuth', firebaseAuth);
};
// TIPS デフォルトexportでなければならない。
export default firebasePlugin;
