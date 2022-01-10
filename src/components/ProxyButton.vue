<script lang="ts" setup>
import { computed } from 'vue';
import { NButtonGroup } from 'naive-ui';
import IcLocation from '~icons/ic/baseline-location-on';
import useSocksProxy from '@/composables/useSocksProxy';
import Button from '@/components/Button/Button.vue';
import useLocations from '@/composables/useLocations';

const { toggleLocations } = useLocations();

const { toggleProxy, socksEnabled } = useSocksProxy();
const color = computed(() => (socksEnabled.value ? 'error' : 'success'));
const label = computed(() => (socksEnabled.value ? 'Disconnect' : 'Connect'));
</script>
<template>
  <div class="flex">
    <n-button-group>
      <Button :color="color" @click="toggleProxy">{{ label }} Proxy</Button>
      <Button class="flex items-center justify-center" @click="toggleLocations">
        <IcLocation />
      </Button>
    </n-button-group>
  </div>
</template>
