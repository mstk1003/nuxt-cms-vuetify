// import axios from 'axios';
import { collection, addDoc, Firestore, doc, getDoc } from 'firebase/firestore';

/**
 * コンテンツ追加
 * @param content コンテンツ
 */
export const addContent = (db: Firestore, title: string, article: string) => {
  addDoc(collection(db, 'contents'), {
    title,
    article
  }).then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  }).catch((err) => {
    console.error('Error adding document: ', err);
  });
};

// export const getContentWithId = (db: Firestore, id: string) => {
//   const docRef = doc(db, )
// }

// TODO コンテンツ取得
// TODO コンテンツ更新
// TODO コンテンツ削除
