import { mount } from '@vue/test-utils';

import Button from '@/components/Buttons/Button.vue';

describe('Button', () => {
  it('should render an a tag', () => {
    const wrapper = mount(Button, {
      props: { href: 'https://www.mullvad.net' },
      slots: { default: 'Mullvad' },
    });
    const aTag = wrapper.find('a');
    expect(aTag.exists()).toBe(true);
    expect(aTag.attributes('href')).toBe('https://www.mullvad.net');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render a button', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Knapp' },
    });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render a blue button', () => {
    const wrapper = mount(Button, {
      props: { color: 'blue' },
      slots: { default: 'Knapp' },
    });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.classes().includes('bg-blue')).toBe(true);

    expect(wrapper.element).toMatchSnapshot();
  });
});
