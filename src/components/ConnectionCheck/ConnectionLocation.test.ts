import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import ConnectionLocation from '@/components/ConnectionCheck/ConnectionLocation.vue';
import { ConnectionKey } from '@/composables/useConnection';

describe('ConnectionLocation.vue', function () {
  it('should render an Unknown location', () => {
    const wrapper = mount(ConnectionLocation, {
      global: {
        provide: {
          [ConnectionKey as symbol]: {
            connection: ref({}),
          },
        },
      },
    });
    expect(wrapper.text()).toMatch('Unknown location');
  });

  it('should render just a city', () => {
    const wrapper = mount(ConnectionLocation, {
      global: {
        provide: {
          [ConnectionKey as symbol]: {
            connection: ref({ city: 'Ulan Bator' }),
          },
        },
      },
    });
    expect(wrapper.text()).toMatch('Ulan Bator');
  });

  it('should render just a Country', () => {
    const wrapper = mount(ConnectionLocation, {
      global: {
        provide: {
          [ConnectionKey as symbol]: {
            connection: ref({ country: 'Mongolia' }),
          },
        },
      },
    });
    expect(wrapper.text()).toMatch('Mongolia');
  });

  it('should render both a City and a Country', () => {
    const wrapper = mount(ConnectionLocation, {
      global: {
        provide: {
          [ConnectionKey as symbol]: {
            connection: ref({ city: 'Ulan Bator', country: 'Mongolia' }),
          },
        },
      },
    });
    expect(wrapper.text()).toMatch('Ulan Bator, Mongolia');
  });
});
