<template>
  <component :is="type" :href="href" :to="to" @click="handleClick" :class="buttonClasses">
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    href: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    color: {
      type: String as () => 'red' | 'green' | 'blue' | 'dark-blue' | 'light-grey',
      default: '',
    },
    size: {
      type: String as () => 'big' | 'medium',
      default: '',
    },
    split: {
      type: String as () => 'right' | 'left' | 'blue',
      default: '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('button-click');
    },
  },
  computed: {
    type() {
      if (this.to) {
        return 'router-link';
      } else if (this.href) {
        return 'a';
      } else {
        return 'button';
      }
    },
    buttonClasses() {
      const splitClass = this.split ? `btn-split-${this.split}` : 'btn-single';
      const colorClass = this.color ? `btn-${this.color}` : 'btn-blue';
      const sizeClass = this.size ? `btn-${this.size}` : 'btn-big';

      return `${splitClass} ${sizeClass} ${colorClass}`;
    },
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/buttons';
</style>
