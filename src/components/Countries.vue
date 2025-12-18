<script lang="ts" setup>
import { NButton, NCollapse, NCollapseItem } from 'naive-ui';
import Cities from '@/components/Cities.vue';
import { Country } from '@/composables/useSocksProxies/socksProxies.types';
import { SetProxyProps, SetRandomProxyProps } from '@/components/Location.vue';

defineProps<{
  countries: Country[];
  setProxy: (props: SetProxyProps) => void;
  setRandomProxy: (props: SetRandomProxyProps) => void;
}>();
</script>

<template>
  <n-collapse arrow-placement="right">
    <n-collapse-item v-for="{ country, cities } in countries" :key="country" :name="country">
      <template #header>
        <n-button quaternary @click.prevent="setRandomProxy({ country })">
          {{ country }}
        </n-button>
      </template>

      <Cities :cities :country :setProxy :setRandomProxy />
    </n-collapse-item>
  </n-collapse>
</template>
