<template>
  <div class="container">
    <TheEditor />
    <BaseButton @click="logout">
      ログアウト
    </BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheEditor from '~/components/TheEditor.vue';
import { logout } from '@/commons/apis/auth';
export default Vue.extend({
  components: {
    TheEditor
  },
  middleware: 'authentification',
  methods: {
    logout () {
      console.log('logout');
      logout();
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  font-size: 1.25rem;
}
</style>
