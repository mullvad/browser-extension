<script lang="ts" setup>
import { ref } from 'vue';
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';
import IconLabel from '@/components/IconLabel.vue';

import { closePopup } from '@/helpers/closePopup';

const password = ref('');

const isValidAccount = (value: string): boolean => {
  // Matches numbers  in group of 4 with spaces or dashes
  const isSixteenDigits = /^\d{4}([- ]?)\d{4}\1\d{4}\1\d{4}$/;
  return isSixteenDigits.test(value);
};

const handleSaveAccount = () => {
  if (isValidAccount(password.value)) {
    console.log('Valid: save it now!');
  } else {
    console.log('Error: not a 16 digits password!');
  }
};
</script>

<template>
  <n-card id="webrtc-leak" :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <h2 class="text-lg">Mullvad Leta automatic login</h2>
    </div>

    <div>
      <p>Mullvad Leta is a privacy focused search engine for Mullvad VPN customers.</p>
      <p>Enter your account number here to stay logged in across browser restart.</p>
    </div>
    <div class="py-4 flex items-center">
      <IconLabel text="Only works when connected to Mullvad VPN" type="info" />
    </div>

    <div class="flex">
      <input
        v-model="password"
        type="password"
        placeholder="Enter your account number"
        class="flex-grow"
      />
      <Button color="green" @click="handleSaveAccount"> Save </Button>
    </div>

    <Button href="https://leta.mullvad.net/faq" @click="closePopup">
      <ExternalLinkIconLabel text="Learn more" />
    </Button>
  </n-card>
</template>

<style scoped>
.n-card {
  scroll-margin-top: 15px;
}
</style>
