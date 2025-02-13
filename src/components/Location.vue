<script lang="ts" setup>
import { computed } from 'vue';

import LocationTabs from '@/components/LocationTabs.vue';
import SearchLocation from '@/components/SearchLocation.vue';
import IconLabel from '@/components/IconLabel.vue';

import getCityCountrySocksProxy from '@/helpers/socksProxy/getCityCountrySocksProxy';
import { updateCurrentTabProxyBadge } from '@/helpers/proxyBadge';

import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import type { HistoryEntry } from '@/composables/useProxyHistory/HistoryEntries.types';
import Countries from '@/components/Countries.vue';

const { customProxyHost, customProxySelect, toggleLocations } = useLocations();
const { clearFilter, filteredProxies, isError, error } = useSocksProxies();

const { setCustomProxy, setGlobalProxy } = useSocksProxy();
const { storeSocksProxyUsage } = useProxyHistory();

const currentOrAllWebsites = computed(() =>
  customProxySelect.value ? customProxyHost.value : 'all your browser traffic',
);

export type SetProxyProps = {
  country: string;
  countryCode: string;
  city: string;
  hostname: string;
  ipv4_address: string;
  port?: number;
};

export type setRandomCountryOrCityProxyProps = { country: string; city?: string };

const setProxy = ({ country, countryCode, city, hostname, ipv4_address, port }: SetProxyProps) => {
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
  clearFilter();
};

const setRandomCountryOrCityProxy = ({
  country,
  city: selectedCity,
}: setRandomCountryOrCityProxyProps) => {
  const { countryCode, city, hostname, ipv4_address, port } = getCityCountrySocksProxy({
    socksProxies: filteredProxies.value,
    country,
    city: selectedCity,
  });

  setProxy({ country, countryCode, city, hostname, ipv4_address, port });
};

const selectLocation = (connection: HistoryEntry) => {
  const { country, countryCode, city, hostname, ipv4_address } = connection;
  if (hostname) {
    setProxy({ country, countryCode, city, hostname, ipv4_address: ipv4_address! });
  } else {
    setRandomCountryOrCityProxy({ country, city });
  }
};
</script>

<template>
  <div v-if="isError">
    <IconLabel :text="error" type="warning" />
  </div>

  <div v-else>
    <p class="mb-4">
      Select the location where you want to have {{ currentOrAllWebsites }} routed through.
    </p>

    <LocationTabs :selectLocation="selectLocation" />
    <SearchLocation />
    <Countries :countries="filteredProxies" :setProxy :setRandomCountryOrCityProxy />
  </div>
</template>

<style scoped>
p {
  color: var(--light-grey);
}
</style>
