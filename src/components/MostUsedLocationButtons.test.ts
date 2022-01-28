import { mount } from '@vue/test-utils';
import MostUsedLocationButtons from '@/components/MostUsedLocationButtons.vue';

import useHistoricConnections from '@/composables/useHistoricConnections/useHistoricConnections';
import Button from '@/components/Buttons/Button.vue';

jest.mock('@/composables/useHistoricConnections/useHistoricConnections', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MostUsedLocationButtons', () => {
  it('should render one button', () => {
    (useHistoricConnections as jest.Mock).mockReturnValueOnce({
      mostUsed: [{ country: 'Argentina' }],
      getLabel: ({ country }: { country: string }) => country,
    });
    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: jest.fn() } });
    const buttons = wrapper.findAllComponents(Button);

    expect(buttons).toHaveLength(1);
    expect(buttons[0]?.text()).toMatch(/argentina/i);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render three buttons', () => {
    (useHistoricConnections as jest.Mock).mockReturnValueOnce({
      mostUsed: [
        { country: 'Sweden' },
        { country: 'Norway' },
        { country: 'Iceland' },
        { country: 'Denmark' },
        { country: 'France' },
        { country: 'Spain' },
      ],
      getLabel: ({ country }: { country: string }) => country,
    });
    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: jest.fn() } });
    const buttons = wrapper.findAllComponents(Button);

    expect(buttons).toHaveLength(3);
    expect(buttons[0]?.text()).toMatch(/sweden/i);
    expect(buttons[1]?.text()).toMatch(/norway/i);
    expect(buttons[2]?.text()).toMatch(/iceland/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
