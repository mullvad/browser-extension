<script lang="ts" setup>
import { City, SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';
import { NCollapse, NCollapseItem, NSpace } from 'naive-ui';
import ProxyList from '@/components/ProxyList.vue';
import CityButton from '@/components/CityButton.vue';
import { SetProxyProps, SetRandomProxyProps } from '@/components/Countries.vue';

const { country, setProxy, setRandomProxy } = defineProps<{
  cities: City[];
  country: string;
  setProxy: (props: SetProxyProps) => void;
  setRandomProxy: (props: SetRandomProxyProps) => void;
}>();

const onClickCity = (city: string) => {
  setRandomProxy({ country, city });
};

const onClickProxy = (proxy: SocksProxy) => {
  const {
    location: { country, countryCode, city },
    hostname,
    ipv4_address,
    port,
  } = proxy;
  setProxy({ country, countryCode, city, hostname, ipv4_address, port });
};
</script>

<template>
  <div v-if="cities?.length === 1">
    <n-space vertical class="ml-8">
      <CityButton :city="cities[0].city" :onClickCity />
      <ProxyList :cities :onClickProxy />
    </n-space>
  </div>

  <n-collapse v-else arrow-placement="right">
    <n-collapse-item v-for="{ city } in cities" :key="city" :name="city" :title="city">
      <template #header>
        <CityButton :city :onClickCity />
      </template>

      <n-space vertical>
        <ProxyList :cities :onClickProxy />
      </n-space>
    </n-collapse-item>
  </n-collapse>
</template>
