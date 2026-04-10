import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import RecentLocationButtons from '@/components/RecentLocationButtons.vue';

import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import Button from '@/components/Buttons/Button.vue';

vi.mock('@/composables/useProxyHistory/useProxyHistory', () => ({
  default: vi.fn(),
}));

describe('RecentLocationButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    const wrapper = mount(RecentLocationButtons, { props: { selectLocation: vi.fn() } });
    const buttons = wrapper.findAllComponents(Button);
    // The second button is the remove button
    await buttons[1]?.trigger('click');

    expect(removeEntry).toHaveBeenCalledWith(entry);
  });
});
