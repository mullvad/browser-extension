<script lang="ts" setup>
import { inject } from 'vue';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import IconLabel from '@/components/IconLabel.vue';

const { connection } = inject(ConnectionKey, defaultConnection);
</script>
<template>
  <IconLabel :state="connection.isMullvad" text="Using Mullvad VPN" />
</template>
