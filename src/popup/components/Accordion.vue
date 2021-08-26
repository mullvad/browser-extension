<template>
  <div
    class="accordion"
    :class="{
      'is-closed': !isOpen,
    }"
  >
    <div class="accordion-header" @click="toggleAccordion">
      <p>{{ title }}</p>
      <img v-if="isOpen" src="../../assets/svg/chevron-up.svg" />
      <img v-else src="../../assets/svg/chevron-down.svg" />
    </div>

    <div class="accordion-body">
      <div class="accordion-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Accordion',
  props: {
    title: { type: String, required: true },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAccordion: function (): void {
      this.isOpen = !this.isOpen;
    },
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/colors';

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0.8rem 1rem;
  cursor: pointer;
  background-color: $blue;
  border-bottom: 1px solid $dark-blue;

  &:hover {
    background-color: $blue60;
  }
}

.accordion-body {
  background-color: $dark-blue;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  transition: 0.2s ease all;
}

.is-closed .accordion-body {
  max-height: 0;
}
</style>
