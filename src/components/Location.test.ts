import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import { NCollapseItem } from 'naive-ui';

import Location from '@/components/Location.vue';
import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';

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

const createResponse = (data: SocksProxy[]): Response =>
  ({
    ok: true,
    json: async () => data,
  }) as Response;

describe('Location', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should not show any country', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createResponse([
        {
          // Offline
          online: false,
          hostname: 'narnia',
          ipv4_address: '1.2.3.4',
          ipv6_address: '11:22:33:44',
          port: 1,
          location: {
            country: 'Narnia',
            countryCode: 'Na',
            city: 'Narnia',
            code: 'Na-Na',
            longitude: 1,
            latitude: 1,
          },
        },
        {
          online: true,
          hostname: 'mordor',
          // no ip4_address
          ipv4_address: undefined as any,
          ipv6_address: '55.66:77:88',
          port: 2,
          location: {
            country: 'Mordor',
            countryCode: 'Mo',
            city: 'Mordor',
            code: 'Mo-Mo',
            longitude: 2,
            latitude: 2,
          },
        },
        {
          online: true,
          // no hostname
          hostname: undefined as any,
          ipv4_address: '1.2.3.5',
          ipv6_address: '55.66:77:88',
          port: 2,
          location: {
            country: 'Mordor',
            countryCode: 'Mo',
            city: 'Mordor',
            code: 'Mo-Mo',
            longitude: 2,
            latitude: 2,
          },
        },
      ]),
    );

    const wrapper = mount(Location);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(0);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show one country', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          online: true,
          hostname: 'narnia',
          ipv4_address: '1.2.3.4',
          ipv6_address: '11:22:33:44',
          port: 1,
          location: {
            country: 'Narnia',
            countryCode: 'Na',
            city: 'Narnia',
            code: 'Na-Na',
            longitude: 1,
            latitude: 1,
          },
        },
      ],
    } as Response);

    const wrapper = mount(Location);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(1);
    expect(countries[0]?.text()).toMatch(/narnia/i);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show two countries sorted by name', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          online: true,
          hostname: 'narnia',
          ipv4_address: '1.2.3.4',
          ipv6_address: '11:22:33:44',
          port: 1,
          location: {
            country: 'Narnia',
            countryCode: 'Na',
            city: 'Narnia',
            code: 'Na-Na',
            longitude: 1,
            latitude: 1,
          },
        },
        {
          online: true,
          hostname: 'mordor',
          ipv4_address: '5.6.7.8',
          ipv6_address: '55.66:77:88',
          port: 2,
          location: {
            country: 'Mordor',
            countryCode: 'Mo',
            city: 'Mordor',
            code: 'Mo-Mo',
            longitude: 2,
            latitude: 2,
          },
        },
      ],
    } as Response);

    const wrapper = mount(Location);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(2);
    expect(countries[0]?.text()).toMatch(/mordor/i);
    expect(countries[1]?.text()).toMatch(/narnia/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
