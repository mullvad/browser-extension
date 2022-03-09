import { RouterLinkStub, mount } from '@vue/test-utils';

import RecommendationsCarousel from '@/components/RecommendationsCarousel.vue';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';

jest.mock('@/composables/useRecommendations/useRecommendations', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RecommendationsCarousel', () => {
  it('should show a success message when no more recommendations are left', () => {
    (useRecommendations as jest.Mock).mockReturnValueOnce({ activeRecommendations: [] });
    const wrapper = mount(RecommendationsCarousel, {
      global: { stubs: { RouterLink: RouterLinkStub } },
    });

    const spanTag = wrapper.find('[data-test="success-message"]');
    expect(spanTag.exists()).toBe(true);
    // the reg exp flag "i" means case-insensitive, so you can ignore casing in the test
    expect(spanTag.text()).toMatch(/sweet! you have taken action on all recommendations.$/i);
    expect(wrapper.element).toMatchSnapshot();
  });
});
