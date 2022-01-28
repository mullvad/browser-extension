import { mount } from '@vue/test-utils';
import { NCollapseItem } from 'naive-ui';

import Location from '@/components/Location.vue';
import useSocksProxies from '@/composables/useSocksProxies';

jest.mock('@/composables/useSocksProxies', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/composables/useSocksProxy', () => ({
  __esModule: true,
  default: () => ({ connectToSocksProxy: jest.fn() }),
}));

describe('Location', () => {
  it('should show a loading message', () => {
    (useSocksProxies as jest.Mock).mockReturnValueOnce({ isLoading: true });
    const wrapper = mount(Location);
    expect(wrapper.text()).toMatch(/loading/i);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show an error message', () => {
    (useSocksProxies as jest.Mock).mockReturnValueOnce({ isError: true, error: 'Network error' });
    const wrapper = mount(Location);
    expect(wrapper.text()).toMatch(/network error/i);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show two countries',  () => {
    (useSocksProxies as jest.Mock).mockReturnValueOnce({
      data: [
        { country: 'Australia' },
        { country: 'Austria' },
      ],
    });
    const wrapper = mount(Location);

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(2);
    expect(countries.at(0)?.text()).toMatch(/australia/i);
    expect(countries.at(1)?.text()).toMatch(/austria/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
