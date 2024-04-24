<script lang="ts" setup>
import { computed } from 'vue';
import { NButton, NCollapse, NCollapseItem, NSpace } from 'naive-ui';

import LocationTabs from '@/components/LocationTabs.vue';

import { updateTabsProxyBadges } from '@/helpers/browserAction';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';

import useListProxies from '@/composables/useListProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useActiveTab from '@/composables/useActiveTab';
import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import type { HistoryEntry } from '@/composables/useProxyHistory/HistoryEntries.types';

const { activeTabHost } = useActiveTab();
const { hostProxySelect, toggleLocations } = useLocations();
const { proxiesList } = useListProxies();
const { setCurrentHostProxy, setGlobalProxy } = useSocksProxy();
const { storeSocksProxyUsage } = useProxyHistory();

const currentOrAllWebsites = computed(() =>
  hostProxySelect.value ? activeTabHost.value : 'all your browser traffic',
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

  if (hostProxySelect.value) {
    setCurrentHostProxy(
      { country, countryCode, city, hostname, ipv4_address, port },
      activeTabHost.value,
    );
  } else {
    setGlobalProxy({ country, countryCode, city, hostname, ipv4_address, port });
  }
  updateTabsProxyBadges();
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
};

const clickCountryOrCity = (selectedCountry: string, selectedCity?: string) => {
  const { country, countryCode, city, hostname, ipv4_address, port } = getRandomSocksProxy({
    socksProxies: proxiesList.value,
    country: selectedCountry,
    city: selectedCity,
  });

  setProxy(country, countryCode, city, hostname, ipv4_address, port);
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
  <p class="mb-8">
    Select the location where you want to have {{ currentOrAllWebsites }} routed through.
  </p>
  <div>
    <LocationTabs :selectLocation="selectLocation" />
    <n-collapse arrow-placement="right">
      <n-collapse-item v-for="{ country, cities } in proxiesList" :key="country" :name="country">
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
