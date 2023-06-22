<script lang="ts" setup>
import { NButton, NCollapse, NCollapseItem, NSpace } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';
import LocationTabs from '@/components/LocationTabs.vue';

import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useHistoricConnections from '@/composables/useHistoricConnections/useHistoricConnections';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';
import type { HistoricConnection } from '@/composables/useHistoricConnections/HistoricConnections.types';

const { toggleLocations } = useLocations();
const { data: socksProxies, isLoading, isError, error } = useSocksProxies();
const { connectToSocksProxy } = useSocksProxy();
const { storeSocksProxyUsage } = useHistoricConnections();

const clickSocksProxy = async (
  country: string,
  city: string,
  hostname: string,
  ipv4_address: string,
  port?: number,
) => {
  storeSocksProxyUsage({ country, city, hostname, ipv4_address });
  await connectToSocksProxy(ipv4_address, port);
  toggleLocations();
};

const clickCountryOrCity = async (country: string, city?: string) => {
  const { ipv4_address, port } = getRandomSocksProxy({
    socksProxies: socksProxies.value,
    country,
    city,
  });
  storeSocksProxyUsage({ country, city });
  await connectToSocksProxy(ipv4_address, port);
  toggleLocations();
};

const selectLocation = (connection: HistoricConnection) => {
  const { country, city, hostname, ipv4_address } = connection;
  if (hostname) {
    clickSocksProxy(country, city, hostname, ipv4_address);
  } else {
    clickCountryOrCity(country, city);
  }
};
</script>

<template>
  <p class="mb-8">
    Select the location where you want to have all your browser traffic routed through.
  </p>
  <p v-if="isLoading" class="text-lg flex items-center">
    <IconLabel text="Loading proxy servers list" type="spinner" />
  </p>
  <p v-else-if="isError">{{ error }}</p>
  <div v-else>
    <LocationTabs :selectLocation="selectLocation" />
    <n-collapse arrow-placement="right">
      <n-collapse-item v-for="{ country, cities } in socksProxies" :key="country" :name="country">
        <template #header>
          <n-button quaternary @click.prevent="clickCountryOrCity(country)">
            {{ country }}
          </n-button>
        </template>
        <n-collapse arrow-placement="right">
          <n-collapse-item
            v-for="{ city, proxyList } in cities"
            :key="city"
            :name="city"
            :title="city"
          >
            <template #header>
              <n-button quaternary @click.prevent="clickCountryOrCity(country, city)">
                {{ city }}
              </n-button>
            </template>
            <n-space vertical>
              <n-button
                v-for="proxy in proxyList"
                :key="proxy.hostname"
                secondary
                medium
                @click="
                  clickSocksProxy(country, city, proxy.hostname, proxy.ipv4_address, proxy.port)
                "
              >
                {{ proxy.hostname }}
              </n-button>
            </n-space>
          </n-collapse-item>
        </n-collapse>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>
p {
  color: var(--light-grey);
}
</style>
