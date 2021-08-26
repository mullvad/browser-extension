<template>
  <router-link to="/privacy-extensions" v-slot="{ navigate }" custom>
    <div @click="navigate" role="link" class="notification">
      <img src="../../assets/svg/warning.svg" />

      <p v-if="cta === 'install'">{{ cta }} {{ name }} to {{ description }}</p>
      <p v-if="cta === 'enable'">
        {{ cta }} the {{ name }} extension from the Firefox <b>Addons Manager</b> settings page.
      </p>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Recommendation',
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cta: { type: String, required: true },
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/colors';

.notification {
  display: flex;
  align-content: center;
  align-items: center;

  padding: 0.3rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: $blue60;
  }

  p {
    font-size: 0.9rem;
    color: $light-grey;

    &:first-letter {
      text-transform: capitalize;
    }
  }

  img {
    height: 1.3rem;
    width: 1.3rem;
    margin-right: 0.5rem;
  }
}
</style>
