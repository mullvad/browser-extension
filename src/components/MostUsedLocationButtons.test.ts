import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import MostUsedLocationButtons from '@/components/MostUsedLocationButtons.vue';

import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import Button from '@/components/Buttons/Button.vue';

vi.mock('@/composables/useProxyHistory/useProxyHistory', () => ({
  default: vi.fn(),
}));

describe('MostUsedLocationButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render one button', () => {
    vi.mocked(useProxyHistory).mockReturnValueOnce({
      mostUsed: {
        value: [{ country: 'Argentina' }],
      },
      mostRecent: {
        value: [{ country: 'Argentina' }],
      },
      getLabel: ({ country }: { country: string }) => country,
    } as unknown as ReturnType<typeof useProxyHistory>);

    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: vi.fn() } });
    const buttons = wrapper.findAllComponents(Button);

    expect(buttons).toHaveLength(1);
    expect(buttons[0]?.text()).toMatch(/argentina/i);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render three buttons', () => {
    vi.mocked(useProxyHistory).mockReturnValueOnce({
      mostUsed: {
        value: [
          { country: 'Sweden' },
          { country: 'Norway' },
          { country: 'Iceland' },
          { country: 'Denmark' },
          { country: 'France' },
          { country: 'Spain' },
        ],
      },
      mostRecent: {
        value: [
          { country: 'Sweden' },
          { country: 'Norway' },
          { country: 'Iceland' },
          { country: 'Denmark' },
          { country: 'France' },
          { country: 'Spain' },
        ],
      },
      getLabel: ({ country }: { country: string }) => country,
    } as unknown as ReturnType<typeof useProxyHistory>);
    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: vi.fn() } });
    const buttons = wrapper.findAllComponents(Button);

    expect(buttons).toHaveLength(3);
    expect(buttons[0]?.text()).toMatch(/sweden/i);
    expect(buttons[1]?.text()).toMatch(/norway/i);
    expect(buttons[2]?.text()).toMatch(/iceland/i);

    expect(wrapper.element).toMatchSnapshot();
  });
});
