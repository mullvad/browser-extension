import { vi, it, describe, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import { NCollapseItem } from 'naive-ui';

import Location from '@/components/Location.vue';

vi.mock('@vueuse/core', () => ({
  useStorageAsync: vi.fn(),
}));

vi.mock('@/composables/useStore', () => ({
  default: vi.fn(() => ({
    historyEntries: { value: {} },
  })),
}));

vi.mock('@/composables/useActiveTab', () => ({
  default: vi.fn(() => ({
    activeTabHost: 'example.com',
  })),
}));

vi.mock('@/composables/useSocksProxies/useSocksProxies', () => ({
  default: vi.fn(() => ({
    filteredProxies: [
      {
        country: 'Narnia',
        cities: [],
      },
      {
        country: 'Albania',
        cities: [{ city: 'Tirana', proxyList: [] }],
      },
      {
        country: 'Australia',
        cities: [
          {
            city: 'Sydney',
            proxyList: [
              {
                online: true,
                hostname: 'au-syd-wg-001',
                ipv4_address: '',
                ipv6_address: '',
                port: 69,
                location: {
                  city: 'Sydney',
                  code: 'syd',
                  country: 'Australia',
                  countryCode: 'au',
                  longitude: 88,
                  latitude: 89,
                },
              },
            ],
          },
        ],
      },
    ],
  })),
}));

vi.mock('@/helpers/connCheck', () => ({
  connCheckIpv4: vi.fn().mockResolvedValue({
    ip: '193.32.126.67',
    city: 'Paris',
    country: 'France',
    mullvad_exit_ip: true,
    mullvad_exit_ip_hostname: 'fr-par-wg-002.relays.mullvad.net',
    mullvad_server_type: 'wireguard',
  }),
  connCheckIpv6: vi.fn().mockResolvedValue('2001:db8::1'),
}));

describe('Location', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show two countries', async () => {
    const wrapper = mount(Location);
    await wrapper.vm.$nextTick();

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(3);
    expect(countries[0]?.text()).toMatch(/narnia/i);
    expect(countries[1]?.text()).toMatch(/albania/i);
    expect(countries[2]?.text()).toMatch(/australia/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
