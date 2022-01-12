<script lang="ts" setup>
import { inject, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { ConnectionKey } from '@/composables/useConnection';
import IconLabel from '@/components/IconLabel.vue';

const connection = inject(ConnectionKey, ref({} as Connection));
</script>
<template>
  <IconLabel :state="connection.isMullvad" text="Using Mullvad VPN" />
</template>
