<template>
  <button
    class="button"
    @click="$emit('click')"
  >
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BaseButton'
});
</script>

<style lang="scss" scoped>

</style>
