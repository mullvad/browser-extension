<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import FeEye from '@/components/Icons/FeEye.vue';
import FeEyeOff from '@/components/Icons/FeEyeOff.vue';
import IconLabel from '@/components/IconLabel.vue';

import useStore from '@/composables/useStore';

const { accountNumber } = useStore();

const invalidAccount = ref(false);
const isAccountVisible = ref(false);
const password = ref('');

const isValidAccount = (value: string): boolean => {
  // Matches numbers  in group of 4 with spaces or dashes
  const isSixteenDigits = /^\d{4}([- ]?)\d{4}\1\d{4}\1\d{4}$/;
  return isSixteenDigits.test(value);
};

const handleSaveAccount = () => {
  if (isValidAccount(password.value)) {
    invalidAccount.value = false;
    accountNumber.value = password.value;
    //TODO add cookie mecanism
  } else {
    invalidAccount.value = true;
    console.log('Error: not a 16 digits password!');
  }
};

const toggleAccount = () => {
  isAccountVisible.value = !isAccountVisible.value;
};

const clearAccount = () => {
  accountNumber.value = '';
  // TODO Should delete the cookie as well
};

// TODO Check where prettifying makes more sense to do
const prettifyAccount = (accountNumber: string) => accountNumber.match(/.{1,4}/g)!.join(' ');

const accountString = computed(() =>
  isAccountVisible.value ? prettifyAccount(accountNumber.value) : '•••• •••• •••• ••••',
);
</script>

<template>
  <n-card id="webrtc-leak" :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <h2 class="text-lg">Mullvad Leta Auto Login</h2>
    </div>

    <div class="py-4 flex items-center">
      <IconLabel text="Only works when connected to Mullvad VPN" type="info" />
    </div>

    <div v-if="accountNumber === ''">
      <div class="flex">
        <input v-model="password" type="password" placeholder="Enter your account number" />
        <Button class="ml-2" @click="handleSaveAccount"> Login </Button>
      </div>
      <div v-if="invalidAccount" class="py-4 flex items-center">
        <IconLabel text="The account entered is not a valid 16 digits number" type="warning" />
      </div>
    </div>

    <div v-else>
      <span class="account-number mr-2">
        {{ accountString }}
      </span>
      <button @click="toggleAccount">
        <FeEyeOff v-if="isAccountVisible" />
        <FeEye v-else />
      </button>
      <Button class="ml-2" @click="clearAccount"> Logout </Button>
    </div>
  </n-card>
</template>

<style scoped>
.n-card {
  scroll-margin-top: 15px;
}

.account-number {
  font-family: monospace;
}
</style>
