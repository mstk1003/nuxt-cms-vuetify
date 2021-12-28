import { Middleware } from '@nuxt/types';
import { getAuth } from 'firebase/auth';

const authentification: Middleware = ({ redirect }) => {
  if (process.client) {
    // console.log('client getAuthをよびます');
    // const auth = getAuth();
    // console.log('client getAuthをよびました', auth.currentUser);
    // auth.onAuthStateChanged((user) => {
    //   if (!user) {
    //     console.log('client sign out', user);
    //     redirect('/login');
    //   } else {
    //     console.log('client sign in', user);
    //   }
    // });
  } else {
    console.log('server getAuthをよびます');
    const auth = getAuth();
    console.log('server getAuthをよびました', auth.currentUser);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('server sign out', user);
        redirect('/login');
      } else {
        console.log('server sign in', user);
      }
    });
  }
};

export default authentification;
