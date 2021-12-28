import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth';

export const signUp = (email: string, password: string) => createUserWithEmailAndPassword(getAuth(), email, password)
  .then((userCredential) => {
    // Signed in
    return userCredential.user;
  })
  .catch((error) => {
    // アカウント作成失敗
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('アカウント作成に失敗しました。', errorCode, errorMessage);
  });

export const login = (email: string, password: string) => {
  const auth = getAuth();
  return setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        return userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ログインに失敗しました。', errorCode, errorMessage);
      });
  });
};

// ログアウト
export const logout = () => signOut(getAuth())
  .then(() => {
    console.log('ログアウトしました。');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('ログアウトに失敗しました。', errorCode, errorMessage);
  });

// TODO loginState実装
export const loginState = (auth: any) => onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log('ログイン中です。', user);
    return user;
    // ...
  } else {
    // User is signed out
    console.log('ログアウトしました。');
  }
});
