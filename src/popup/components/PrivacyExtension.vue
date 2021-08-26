<template>
  <div class="privacy-ext">
    <div class="container ext-header">
      <div>
        <img :src="require('../../assets/icons/' + ext.icon)" />
        <h2 class="h2-title">{{ ext.name }}</h2>
      </div>

      <div v-if="status == 'activated'">
        <img src="../../assets/svg/tick.svg" />
      </div>

      <div v-else-if="status == 'disabled'">
        <img src="../../assets/svg/warning.svg" />
      </div>

      <split-button v-else size="medium">
        <template v-slot:left-button>
          <Button v-if="status == 'ignored'" color="light-grey" size="medium"> Ignored </Button>
          <Button
            v-else
            :href="ext.addonUrl"
            @button-click="closePopup"
            split="left"
            color="green"
            size="medium"
          >
            Install
          </Button>
        </template>

        <template v-slot:right-button>
          <Button @button-click="toggleDropdown" split="right" color="dark-blue" size="medium">
            <img v-if="isClosed" src="../../assets/svg/chevron-down.svg" />
            <img v-else src="../../assets/svg/chevron-up.svg" />
          </Button>
        </template>
      </split-button>

      <Button
        @button-click="ignoreRecommendation(!ext.ignored)"
        :class="{ ['is-hidden']: isClosed, 'split-dropdown': true }"
        :color="ext.ignored ? 'green' : 'red'"
        size="medium"
      >
        <span v-if="ext.ignored">Enable recommendation</span>
        <span v-else>Disable recommendation</span>
      </Button>
    </div>

    <div class="container">
      <p>
        {{ ext.longDescription }}
      </p>

      <Message v-if="status == 'disabled'" type="warning">
        <p>Enable {{ ext.name }} from the Firefox <b>Extensions</b> settings page.</p>
      </Message>

      <div class="ext-links">
        <Button :href="ext.homeUrl" @button-click="closePopup" color="blue" size="medium"
          >Learn more
          <img src="../../assets/svg/ext-link.svg" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Extension, onIgnore } from '@/helpers/extensions';

import Button from './Button.vue';
import Message from './Message.vue';
import SplitButton from './SplitButton.vue';

export default Vue.extend({
  name: 'PrivacyExtension',
  components: {
    Button,
    Message,
    SplitButton,
  },
  props: {
    ext: { type: Object as () => Extension, required: true },
    extensions: {
      type: Array as () => Array<Extension>,
      required: true,
    },
  },
  data() {
    return {
      isClosed: true,
    };
  },
  methods: {
    closePopup() {
      // The delay is added to stop a new browser window from opening
      // when installing the extension
      setTimeout(function () {
        window.close();
      }, 100);
    },
    toggleDropdown() {
      this.isClosed = !this.isClosed;
    },
    async ignoreRecommendation(status: boolean): Promise<void> {
      await onIgnore(this.ext, status);
      this.$emit('update-recommendations');
      this.isClosed = true;
    },
  },
  computed: {
    status(): string {
      if (this.ext.ignored) {
        return 'ignored';
      } else if (this.ext.installed && !this.ext.enabled) {
        return 'disabled';
      } else if (!this.ext.ignored && !this.ext.installed) {
        return 'not installed';
      } else {
        return 'activated';
      }
    },
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/buttons';
@import '../../assets/scss/colors';

.privacy-ext {
  .container > p {
    color: $light-grey;
    font-size: 0.9rem;
  }
}

.ext-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  margin: 0.5rem 0;
}

.ext-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: $blue;

  div:first-child {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 1.3rem;
      width: 1.3rem;
      margin-right: 0.4rem;
    }
  }
}

.is-hidden {
  display: none;
}

.split-dropdown {
  // To make the dropdown an overlay
  z-index: 999;
  overflow: auto;
  position: absolute;

  top: 2.8rem;
  right: 1rem;
}
</style>
