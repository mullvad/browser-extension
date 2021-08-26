<template>
  <div :class="buttonClass">
    <slot name="left-button"></slot>
    <slot name="right-button"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SplitButton',
  props: {
    size: {
      type: String,
      required: true,
    },
  },
  computed: {
    buttonClass() {
      const size = this.size ? '-' + this.size : '';

      return `btn-split-container${size}`;
    },
  },
});
</script>
