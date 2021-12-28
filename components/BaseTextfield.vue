<template>
  <div class="module-container">
    <textarea
      :name="name"
      class="textfield"
      required
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BaseTextfield',
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
    }
  }
});
</script>

<style lang="scss" scoped>
.textfield {
  width: 100%;
  height: 80vh;
  box-sizing: border-box;
}
</style>
