<template>
  <div>
    <input
      :name="name"
      class="input-text"
      required
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseInputText',
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'placeholder'
    },
    type: {
      type: String,
      default: 'text',
      validator (val) {
        return ['text', 'password'].includes(val);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.input-text {
  width: 100%;
  box-sizing: border-box;
}
</style>
