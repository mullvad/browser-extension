import { RouterLinkStub, shallowMount } from '@vue/test-utils';

import RecommendationsCarousel from '@/components/RecommendationsCarousel.vue';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';

jest.mock('@/composables/useRecommendations/useRecommendations', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RecommendationsCarousel', () => {
  it('should show a success message when no more recommendations are left', () => {
    (useRecommendations as jest.Mock).mockReturnValueOnce({ activeRecommendations: [] });
    const wrapper = shallowMount(RecommendationsCarousel, {
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.find('[data-test="success-message"]').exists()).toBe(true);
    expect(wrapper.text()).toMatch(/see all privacy recommendations$/i);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show a "Show all" link when there are recommendations', () => {
    (useRecommendations as jest.Mock).mockReturnValueOnce({ activeRecommendations: [{}, {}] });
    const wrapper = shallowMount(RecommendationsCarousel, {
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.find('[data-test="show-all-link"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="success-message"]').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });
});
