import { mount } from '@vue/test-utils';
import { NCollapseItem } from 'naive-ui';

import Location from '@/components/Location.vue';

jest.mock('@/composables/useActiveTab', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    activeTabHost: 'example.com',
  })),
}));

jest.mock('@/composables/useListProxies', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    proxiesList: [
      {
        country: 'Albania',
      },
      {
        country: 'Australia',
      },
    ],
  })),
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
