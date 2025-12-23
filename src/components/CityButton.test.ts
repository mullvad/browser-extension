import CityButton from '@/components/CityButton.vue';
import { mount } from '@vue/test-utils';
import { NButton } from 'naive-ui';

describe('CityButton', () => {
  it('should render a CityButton', () => {
    const onClickCity = vi.fn();
    const wrapper = mount(CityButton, { props: { city: 'Narnia', onClickCity } });

    const buttons = wrapper.findAllComponents(NButton);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toBe('Narnia');

    buttons[0].trigger('click');
    expect(onClickCity).toHaveBeenCalledWith('Narnia');
    expect(wrapper.element).toMatchSnapshot();
  });
});
