import { mount } from '@vue/test-utils';
import { NCollapseItem } from 'naive-ui';

import Location from '@/components/Location.vue';
import useListProxies from '@/composables/useListProxies';

jest.mock('@/composables/useListProxies', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Location', () => {
  it('should show two countries', async () => {
    (useListProxies as jest.Mock).mockReturnValueOnce({
      proxiesList: [
        {
          country: 'Albania',
        },
        {
          country: 'Australia',
        },
      ],
    });

    const wrapper = mount(Location);
    await wrapper.vm.$nextTick();

    const countries = wrapper.findAllComponents(NCollapseItem);
    expect(countries).toHaveLength(2);
    expect(countries[0]?.text()).toMatch(/albania/i);
    expect(countries[1]?.text()).toMatch(/australia/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
