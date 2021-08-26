<template>
  <div :style="'margin-right: ' + scrollbarWidth + 'px'">
    <header class="header-title">
      <img src="../../assets/svg/chevron-left-circle.svg" @click="handleBack" />
      <h2>{{ title }}</h2>
      <br />
    </header>

    <section>
      <div class="info container">
        <p>{{ description }}</p>
      </div>
    </section>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '../router';

export default Vue.extend({
  name: 'SubView',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scrollbarWidth: 0,
    };
  },
  methods: {
    handleBack() {
      router.push('/');
    },
  },
  created() {
    const scrollbarWidth = getScrollbarWidth();
    console.log('The created true width!: ', scrollbarWidth);

    this.scrollbarWidth = scrollbarWidth;

    function getScrollbarWidth() {
      // Creating invisible container
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // forcing scrollbar to appear
      document.body.appendChild(outer);

      // Creating inner element and placing it in the container
      const inner = document.createElement('div');
      outer.appendChild(inner);

      // Calculating difference between container's full width and the child width
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      // Removing temporary elements from the DOM
      outer.parentNode!.removeChild(outer);

      return scrollbarWidth;
    }
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/base';

body {
  overflow-x: hidden;
  overflow-y: visible;
}

/* HEADER */
.h2-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.header-title {
  @extend .header;

  h2 {
    @extend .h2-title;
  }
}

.info {
  @extend .light-text;
}
</style>
