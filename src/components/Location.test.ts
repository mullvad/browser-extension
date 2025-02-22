import { mount } from '@vue/test-utils';
import { NCollapseItem } from 'naive-ui';

import Location from '@/components/Location.vue';

jest.mock('@vueuse/core', () => ({
  useStorageAsync: jest.fn(),
}));

jest.mock('@/composables/useStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    historyEntries: { value: {} },
  })),
}));

jest.mock('@/composables/useActiveTab', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    activeTabHost: 'example.com',
  })),
}));

jest.mock('@/composables/useSocksProxies', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    filteredProxies: [
      {
        country: 'Albania',
      },
      {
        country: 'Australia',
      },
    ],
  })),
}));

jest.mock('@/composables/useSocksProxy', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setCustomProxy: jest.fn(),
    setGlobalProxy: jest.fn(),
    globalProxyDetails: { value: {} },
    hostProxiesDetails: { value: {} },
  })),
}));

jest.mock('@/helpers/connCheck', () => ({
  connCheckIpv4: jest.fn().mockResolvedValue({
    ip: '193.32.126.67',
    city: 'Paris',
    country: 'France',
    mullvad_exit_ip: true,
    mullvad_exit_ip_hostname: 'fr-par-wg-002.relays.mullvad.net',
    mullvad_server_type: 'wireguard',
  }),
  connCheckIpv6: jest.fn().mockResolvedValue('2001:db8::1'),
}));

describe('Location', () => {
  it('should show two countries', async () => {
    const wrapper = mount(Location);
    await wrapper.vm.$nextTick();

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(2);
    expect(countries[0]?.text()).toMatch(/albania/i);
    expect(countries[1]?.text()).toMatch(/australia/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
