<script lang="ts" setup>
import { computed } from 'vue';
import { NButton, NCollapse, NCollapseItem, NSpace } from 'naive-ui';

import LocationTabs from '@/components/LocationTabs.vue';
import SearchLocation from '@/components/SearchLocation.vue';

import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';
import { updateCurrentTabProxyBadge } from '@/helpers/proxyBadge';

import useSocksProxies from '@/composables/useSocksProxies/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import type { HistoryEntry } from '@/composables/useProxyHistory/HistoryEntries.types';

const { customProxyHost, customProxySelect, toggleLocations } = useLocations();
const { clearFilter, filteredProxies } = useSocksProxies();

const { setCustomProxy, setGlobalProxy } = useSocksProxy();
const { storeSocksProxyUsage } = useProxyHistory();

const currentOrAllWebsites = computed(() =>
  customProxySelect.value ? customProxyHost.value : 'all your browser traffic',
);

const setProxy = (
  country: string,
  countryCode: string,
  city: string,
  hostname: string,
  ipv4_address: string,
  port?: number,
) => {
  storeSocksProxyUsage({ country, countryCode, city, hostname, ipv4_address });
  toggleLocations();

  if (customProxySelect.value) {
    setCustomProxy(
      { country, countryCode, city, hostname, ipv4_address, port },
      customProxyHost.value,
    );
    customProxyHost.value = '';
  } else {
    setGlobalProxy({ country, countryCode, city, hostname, ipv4_address, port });
  }
  updateCurrentTabProxyBadge();
};

const clickServer = (
  country: string,
  countryCode: string,
  city: string,
  hostname: string,
  ipv4_address: string,
  port?: number,
) => {
  setProxy(country, countryCode, city, hostname, ipv4_address, port);
  clearFilter();
};

const clickCountryOrCity = (selectedCountry: string, selectedCity?: string) => {
  const { country, countryCode, city, hostname, ipv4_address, port } = getRandomSocksProxy({
    socksProxies: filteredProxies.value,
    country: selectedCountry,
    city: selectedCity,
  });

  setProxy(country, countryCode, city, hostname, ipv4_address, port);
  clearFilter();
};

const selectLocation = (connection: HistoryEntry) => {
  const { country, countryCode, city, hostname, ipv4_address } = connection;
  if (hostname) {
    clickServer(country, countryCode, city, hostname, ipv4_address!);
  } else {
    clickCountryOrCity(country, city);
  }
};
</script>

<template>
  <p class="mb-4">
    Select the location where you want to have {{ currentOrAllWebsites }} routed through.
  </p>
  <div>
    <LocationTabs :selectLocation="selectLocation" />
    <SearchLocation />
    <n-collapse arrow-placement="right">
      <n-collapse-item
        v-for="{ country, cities } in filteredProxies"
        :key="country"
        :name="country"
      >
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
                  clickServer(
                    country,
                    proxy.location.countryCode,
                    city,
                    proxy.hostname,
                    proxy.ipv4_address,
                    proxy.port,
                  )
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
