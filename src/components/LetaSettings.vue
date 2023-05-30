<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';
import FeEye from '@/components/Icons/FeEye.vue';
import FeEyeOff from '@/components/Icons/FeEyeOff.vue';
import IconLabel from '@/components/IconLabel.vue';

import { checkFormat, formatAccount, FormatType } from '@/helpers/account';
import { closePopup } from '@/helpers/closePopup';

import useLeta from '@/composables/useLeta';
import useConnection from '@/composables/useConnection';

const { account, login, logout } = useLeta();

const { connection } = useConnection();

const invalidAccount = ref(false);
const isAccountVisible = ref(false);
const password = ref('');

const connected = computed(() => connection.value.isMullvad);

const handleLogin = () => {
  const isValidAccount = checkFormat(password.value);
  invalidAccount.value = false;

  if (isValidAccount) {
    account.value = formatAccount(password.value, FormatType.clean);
    login();
  } else {
    invalidAccount.value = true;
  }
};

const toggleAccount = () => {
  isAccountVisible.value = !isAccountVisible.value;
};

const accountString = computed(() => {
  if (isAccountVisible.value) {
    return formatAccount(account.value, FormatType.prettify);
  } else {
    return formatAccount(account.value, FormatType.hidden);
  }
});
</script>

<template>
  <n-card id="leta-settings" :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <h2 class="text-lg">Mullvad Leta Auto Login</h2>
    </div>

    <p>Enter your Mullvad VPN account number to automatically login to Mullvad Leta.</p>

    <div v-if="connected" class="pt-4">
      <div v-if="account === ''">
        <div class="flex">
          <input v-model="password" type="password" placeholder="Enter your account number" />
        </div>
        <div v-if="invalidAccount" class="py-4 flex items-center">
          <IconLabel text="The account entered is not a valid 16 digits number" type="warning" />
        </div>
      </div>

      <div v-else>
        <span class="account-number mr-4">
          {{ accountString }}
        </span>
        <button @click="toggleAccount">
          <FeEyeOff v-if="isAccountVisible" />
          <FeEye v-else />
        </button>
      </div>
    </div>

    <div v-else class="py-4 flex items-center">
      <IconLabel
        text="You need to have an active Mullvad VPN connection to use Mullvad Leta."
        type="warning"
      />
    </div>

    <div v-if="connected" class="flex justify-between pt-4">
      <Button href="https://leta.mullvad.net" @click="closePopup">
        <ExternalLinkIconLabel text="Mullvad Leta" />
      </Button>

      <Button v-if="account === ''" color="success" @click="handleLogin"> Login </Button>
      <Button v-else color="error" @click="logout"> Logout </Button>
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
  font-size: large;
}
</style>
