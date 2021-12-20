import { mount, MountingOptions } from '@vue/test-utils';
import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import { Connection } from '@/helpers/connCheck';

describe('ConnectionLocation.vue', function () {
  it('should render an Unknown location', () => {
    const wrapper = mount(ConnectionLocation, { props: { connection: {} } } as MountingOptions<{
      connection: Connection;
    }>);
    expect(wrapper.text()).toMatch('Unknown location');
  });

  it('should render just a city', () => {
    const wrapper = mount(ConnectionLocation, {
      props: { connection: { city: 'Ulan Bator' } },
    } as MountingOptions<{
      connection: Connection;
    }>);
    expect(wrapper.text()).toMatch('Ulan Bator');
  });

  it('should render just a Country', () => {
    const wrapper = mount(ConnectionLocation, {
      props: { connection: { country: 'Mongolia' } },
    } as MountingOptions<{
      connection: Connection;
    }>);
    expect(wrapper.text()).toMatch('Mongolia');
  });

  it('should render both a City and a Country', () => {
    const wrapper = mount(ConnectionLocation, {
      props: { connection: { city: 'Ulan Bator', country: 'Mongolia' } },
    } as MountingOptions<{
      connection: Connection;
    }>);
    expect(wrapper.text()).toMatch('Ulan Bator, Mongolia');
  });
});
