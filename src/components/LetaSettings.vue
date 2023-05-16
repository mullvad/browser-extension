<script lang="ts" setup>
// import { NCard, NForm, NFormItem, NInput } from 'naive-ui';
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';
import IconLabel from '@/components/IconLabel.vue';

import { closePopup } from '@/helpers/closePopup';
</script>

<template>
  <n-card id="webrtc-leak" :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <h2 class="text-lg">Mullvad Leta</h2>
    </div>

    <div>
      <p>Mullvad Leta is a privacy focused search engine for Mullvad VPN customers.</p>
      <p>Enter your account number here to stay logged in across browser restart.</p>
    </div>
    <div class="py-4 flex items-center">
      <IconLabel text="Only works when connected to Mullvad VPN" type="info" />
    </div>

    <!-- <n-form ref="formRef" inline :label-width="80" :model="formValue" :rules="rules" :size="size">
      <n-form-item label="Account number" path="phone">
        <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
      </n-form-item>
      <n-form-item>
        <n-button @click="handleValidateClick">
          Save
        </n-button>
      </n-form-item>
    </n-form> -->

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
