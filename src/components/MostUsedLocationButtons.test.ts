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

  it('should render one select button and one remove button', () => {
    vi.mocked(useProxyHistory).mockReturnValueOnce({
      mostUsed: {
        value: [{ country: 'Argentina' }],
      },
      mostRecent: {
        value: [{ country: 'Argentina' }],
      },
      getLabel: ({ country }: { country: string }) => country,
      removeEntry: vi.fn(),
    } as unknown as ReturnType<typeof useProxyHistory>);

    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: vi.fn() } });
    const buttons = wrapper.findAllComponents(Button);

    expect(buttons).toHaveLength(2);
    expect(buttons[0]?.text()).toMatch(/argentina/i);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render three proxy servers select buttons and three remove buttons', () => {
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
      removeEntry: vi.fn(),
    } as unknown as ReturnType<typeof useProxyHistory>);
    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: vi.fn() } });
    const buttons = wrapper.findAllComponents(Button);

    expect(buttons).toHaveLength(6);
    expect(buttons[0]?.text()).toMatch(/sweden/i);
    expect(buttons[2]?.text()).toMatch(/norway/i);
    expect(buttons[4]?.text()).toMatch(/iceland/i);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should call removeEntry when remove button is clicked', async () => {
    const removeEntry = vi.fn();
    const entry = { country: 'Sweden' };

    vi.mocked(useProxyHistory).mockReturnValueOnce({
      mostUsed: {
        value: [entry],
      },
      mostRecent: {
        value: [entry],
      },
      getLabel: ({ country }: { country: string }) => country,
      removeEntry,
    } as unknown as ReturnType<typeof useProxyHistory>);

    const wrapper = mount(MostUsedLocationButtons, { props: { selectLocation: vi.fn() } });
    const removeButtons = wrapper.findAllComponents(Button);
    // The second button is the remove button
    await removeButtons[1]?.trigger('click');

    expect(removeEntry).toHaveBeenCalledWith(entry);
  });
});
