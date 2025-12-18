<script lang="ts" setup>
import { NButton, NCollapse, NCollapseItem } from 'naive-ui';
import Cities from '@/components/Cities.vue';
import { Country } from '@/composables/useSocksProxies/socksProxies.types';
import { SetProxyProps, setRandomCountryOrCityProxyProps } from '@/components/Location.vue';

defineProps<{
  countries: Country[];
  setProxy: (props: SetProxyProps) => void;
  setRandomCountryOrCityProxy: (props: setRandomCountryOrCityProxyProps) => void;
}>();
</script>

<template>
  <n-collapse arrow-placement="right">
    <n-collapse-item v-for="{ country, cities } in countries" :key="country" :name="country">
      <template #header>
        <n-button quaternary @click.prevent="setRandomCountryOrCityProxy({ country })">
          {{ country }}
        </n-button>
      </template>

      <Cities :cities :country :setProxy :setRandomCountryOrCityProxy />
    </n-collapse-item>
  </n-collapse>
</template>
