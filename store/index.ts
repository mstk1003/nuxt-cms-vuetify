import { User } from 'firebase/auth';
import { MutationTree } from 'vuex';

export const state = () => ({
  login: false,
  authInfo: {} as User
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  login: (state) => {
    state.login = true;
  },
  logout: (state) => {
    state.login = false;
  },
  setAuthInfo: (state, payload: User) => {
    state.authInfo = payload;
  }
};
