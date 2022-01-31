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

  it('should render a router-link', () => {
    const wrapper = mount(Button, {
      props: { to: '/locations' },
      slots: { default: 'Locations' },
    });
    const routerLink = wrapper.find('router-link');
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.attributes('to')).toBe('/locations');

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
