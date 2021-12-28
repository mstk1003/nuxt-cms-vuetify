<template>
  <div>
    <BaseInputText v-model="email" :placeholder="'E-mail'" :name="'email'" />
    <BaseInputText v-model="password" :placeholder="'Password'" :name="'password'" :type="'password'" />
    <BaseButton @click="sendAccountInfo">
      登録
    </BaseButton>
    <nuxt-link :to="'/login'">
      ログイン画面へ
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseInputText from '~/components/BaseInputText.vue';
import { signUp } from '~/commons/apis/auth';

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
      signUp(this.email, this.password);
      this.$router.push('/login');
    }
  }
});
</script>
