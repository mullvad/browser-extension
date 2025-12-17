import { describe } from 'vitest';
import { mount } from '@vue/test-utils';
import ProxyList from '@/components/ProxyList.vue';
import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';

describe('ProxyList', () => {
  it('should render a single proxy correctly', () => {
    const wrapper = mount(ProxyList, {
      props: {
        cities: [{ city: 'Narnia', proxyList: [{ hostname: 'narnia-001' } as SocksProxy] }],
        onClickProxy: vi.fn(),
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(1);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render multiple proxies correctly', () => {
    const onClickProxy = vi.fn();
    const wrapper = mount(ProxyList, {
      props: {
        cities: [
          {
            city: 'Narnia',
            proxyList: [{ hostname: 'narnia-002' }, { hostname: 'narnia-001' }] as SocksProxy[],
          },
        ],
        onClickProxy,
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toEqual('narnia-002');
    expect(buttons[1].text()).toEqual('narnia-001');

    buttons[0].trigger('click');
    expect(onClickProxy).toHaveBeenCalledWith({
      hostname: 'narnia-002',
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
