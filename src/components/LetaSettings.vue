<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import FeEye from '@/components/Icons/FeEye.vue';
import FeEyeOff from '@/components/Icons/FeEyeOff.vue';
import IconLabel from '@/components/IconLabel.vue';

import { checkFormat, formatAccount, FormatType } from '@/helpers/account';
import useLeta from '@/composables/useLeta';

const { letaLogin, letaLogout, mullvadAccount } = useLeta();

const invalidAccount = ref(false);
const isAccountVisible = ref(false);
const password = ref('');

const handleLogin = () => {
  const isValidAccount = checkFormat(password.value);
  invalidAccount.value = false;

  if (isValidAccount) {
    mullvadAccount.value = formatAccount(password.value, FormatType.clean);
    letaLogin();
  } else {
    invalidAccount.value = true;
  }
};

const toggleAccount = () => {
  isAccountVisible.value = !isAccountVisible.value;
};

const accountString = computed(() => {
  if (isAccountVisible.value) {
    return formatAccount(mullvadAccount.value, FormatType.prettify);
  } else {
    return formatAccount(mullvadAccount.value, FormatType.hidden);
  }
});
</script>

<template>
  <n-card id="webrtc-leak" :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <h2 class="text-lg">Mullvad Leta Auto Login</h2>
    </div>

    <div class="py-4 flex items-center">
      <IconLabel text="Only works when connected to Mullvad VPN" type="info" />
    </div>

    <div v-if="mullvadAccount === ''">
      <div class="flex">
        <input v-model="password" type="password" placeholder="Enter your account number" />
        <Button class="ml-2" @click="handleLogin"> Login </Button>
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
      <Button class="ml-2" @click="letaLogout"> Logout </Button>
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

input {
  padding-left: 10px;
}
</style>
