/*
 * firebaseプラグイン用の型定義
 */
import { Firestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { Auth } from '@firebase/auth';

// vueインスタンス用
declare module 'vue/types/vue' {
  interface Vue {
    readonly $firebaseApp: FirebaseApp
    readonly $fireStoreDb: Firestore
    readonly $firebaseAuth: Auth
  }
}

// store用
declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    readonly $firebaseApp: FirebaseApp
    readonly $fireStoreDb: Firestore
    readonly $firebaseAuth: Auth
  }
}
