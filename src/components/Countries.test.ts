import { describe } from 'vitest';
import { mount } from '@vue/test-utils';
import Countries from '@/components/Countries.vue';
import { NButton } from 'naive-ui';
import { Location, SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';

describe('Countries', () => {
  it('should render a Countries list', () => {
    const setProxy = vi.fn();
    const setRandomProxy = vi.fn();

    const wrapper = mount(Countries, {
      props: {
        setProxy,
        setRandomProxy,
        countries: [
          { country: 'Narnia', cities: [] },
          { country: 'Mordor', cities: [] },
        ],
      },
    });

    const buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toBe('Narnia');
    expect(buttons[1].text()).toBe('Mordor');
    buttons[0].trigger('click');
    expect(setRandomProxy).toHaveBeenCalledWith({ country: 'Narnia' });
    buttons[1].trigger('click');
    expect(setRandomProxy).toHaveBeenCalledWith({ country: 'Mordor' });
    expect(setProxy).not.toHaveBeenCalled();
  });

  it('should render a country with cities', async () => {
    const setProxy = vi.fn();
    const setRandomProxy = vi.fn();

    const wrapper = mount(Countries, {
      props: {
        setProxy,
        setRandomProxy,
        countries: [
          {
            country: 'Narnia',
            cities: [
              {
                city: 'Narnium',
                proxyList: [
                  {
                    hostname: 'na-001',
                    location: {
                      country: 'Narnia',
                      city: 'Narnium',
                      countryCode: 'na',
                    } as Location,
                    ipv4_address: '127.0.0.1',
                    port: 1,
                  },
                ] as SocksProxy[],
              },
              {
                city: 'Nora',
                proxyList: [
                  {
                    hostname: 'no-001',
                    location: {
                      country: 'Narnia',
                      city: 'Nora',
                      countryCode: 'na',
                    } as Location,
                    ipv4_address: '127.0.0.2',
                    port: 2,
                  } as SocksProxy,
                ],
              },
            ],
          },
        ],
      },
    });

    let buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toBe('Narnia');

    let arrows = wrapper.findAll('.n-collapse-item-arrow');
    expect(arrows).toHaveLength(1);
    arrows[0].trigger('click');
    await wrapper.vm.$nextTick();

    buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(3);
    expect(buttons[0].text()).toBe('Narnia');
    expect(buttons[1].text()).toBe('Narnium');
    expect(buttons[2].text()).toBe('Nora');

    buttons[1].trigger('click');
    expect(setRandomProxy).toHaveBeenCalled();

    arrows = wrapper.findAll('.n-collapse-item-arrow');
    expect(arrows).toHaveLength(3);

    arrows[2].trigger('click');
    await wrapper.vm.$nextTick();
    buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(5);
    expect(buttons[0].text()).toBe('Narnia');
    expect(buttons[1].text()).toBe('Narnium');
    expect(buttons[2].text()).toBe('na-001');
    expect(buttons[3].text()).toBe('Nora');

    buttons[2].trigger('click');
    expect(setProxy).toHaveBeenCalled();
  });
});
