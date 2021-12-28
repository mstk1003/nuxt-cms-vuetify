<template>
  <div>
    <BaseInputText v-model="email" :placeholder="'E-mail'" :name="'email'" />
    <BaseInputText v-model="password" :placeholder="'Password'" :name="'password'" :type="'password'" />
    <BaseButton @click="sendAccountInfo">
      ログイン
    </BaseButton>
    <nuxt-link :to="'/sign-up'">
      アカウント登録
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseInputText from '~/components/BaseInputText.vue';
import { login } from '~/commons/apis/auth';

type Data = {
  email: string,
  password: string
}

export default Vue.extend({
  components: { BaseInputText },
  data (): Data {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    sendAccountInfo () {
      login(this.email, this.password)
        .then((authInfo) => {
          if (authInfo !== undefined) {
            this.$store.commit('login');
            console.log('authInfo', authInfo);
            this.$store.commit('setAuthInfo', authInfo);
            this.$router.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }
});
</script>
