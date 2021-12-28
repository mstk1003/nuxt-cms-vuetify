import { Plugin } from '@nuxt/types';

const getAuthInfoFromLocalStrage: Plugin = ({ store }) => {
  const authInfoSessionStorageKey = Object.keys(window.sessionStorage).filter(str => str.startsWith('firebase:authUser'))[0];
  const authInfoString = window.sessionStorage.getItem(authInfoSessionStorageKey);
  if (authInfoString !== null) {
    const authInfo = JSON.parse(authInfoString);
    store.commit('setAuthInfo', authInfo);
  }
};

export default getAuthInfoFromLocalStrage;
