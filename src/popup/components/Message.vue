<template>
  <div :class="messageClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Message',
  props: {
    type: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    messageClass() {
      switch (this.type) {
        case 'warning':
          return 'message-warning';
        default:
          return 'message-info';
      }
    },
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/colors';

.message {
  background-color: $blue;
  color: $white;

  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.9rem 0;

  p {
    font-size: 0.9rem;
  }
}

.message-warning {
  @extend .message;
  border-left: $yellow solid 5px;
}

.message-info {
  @extend .message;
  border-left: $blue40 solid 5px;
}
</style>
