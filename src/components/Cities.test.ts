import { mount } from '@vue/test-utils';
import Cities from '@/components/Cities.vue';
import { NButton } from 'naive-ui';
import { Location, SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';

describe('Cities', () => {
  it('should render a single city', () => {
    const setProxy = vi.fn();
    const setRandomProxy = vi.fn();
    const proxy: SocksProxy = {
      hostname: 'na-001',
      location: {
        country: 'Narnia',
        city: 'Narnium',
        countryCode: 'na',
      } as Location,
      ipv4_address: '127.0.0.1',
      port: 1,
    } as SocksProxy;
    const { location, ...clickedProxy } = proxy;
    const expectedSetProxyProps = {
      ...clickedProxy,
      city: location.city,
      country: location.country,
      countryCode: location.countryCode,
    };

    const wrapper = mount(Cities, {
      props: {
        cities: [{ city: 'Narnium', proxyList: [proxy] }],
        country: 'Narnia',
        setProxy,
        setRandomProxy,
      },
    });

    const buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toEqual('Narnium');
    expect(buttons[1].text()).toEqual('na-001');

    buttons[0].trigger('click');
    expect(setRandomProxy).toHaveBeenCalledWith({ city: 'Narnium', country: 'Narnia' });

    buttons[1].trigger('click');
    expect(setProxy).toHaveBeenCalledWith(expectedSetProxyProps);
  });

  it('should render multiple cities', () => {
    const setProxy = vi.fn();
    const setRandomProxy = vi.fn();
    const proxy: SocksProxy = {
      hostname: 'na-001',
      location: {
        country: 'Narnia',
        city: 'Narnium',
        countryCode: 'na',
      } as Location,
      ipv4_address: '127.0.0.1',
      port: 1,
    } as SocksProxy;
    const proxy1: SocksProxy = {
      hostname: 'no-001',
      location: {
        country: 'Narnia',
        city: 'Nora',
        countryCode: 'na',
      } as Location,
      ipv4_address: '127.0.0.2',
      port: 2,
    } as SocksProxy;
    const { location, ...clickedProxy } = proxy;
    const expectedSetProxyProps = {
      ...clickedProxy,
      city: location.city,
      country: location.country,
      countryCode: location.countryCode,
    };

    const wrapper = mount(Cities, {
      props: {
        cities: [
          { city: 'Nora', proxyList: [proxy1] },
          { city: 'Narnium', proxyList: [proxy] },
        ],
        country: 'Narnia',
        setProxy,
        setRandomProxy,
      },
    });

    const buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toEqual('Nora');
    expect(buttons[1].text()).toEqual('Narnium');

    buttons[1].trigger('click');
    expect(setRandomProxy).toHaveBeenCalledWith({ city: 'Narnium', country: 'Narnia' });
  });
});
