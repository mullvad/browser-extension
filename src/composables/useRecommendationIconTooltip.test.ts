import useRecommendationIconTooltip from '@/composables/useRecommendationIconTooltip';
import { ref } from 'vue';
import { Recommendation } from '@/composables/useRecommendations/Recommendation.types';

describe('useRecommendationIconTooltip', () => {
  describe('Extensions', () => {
    it('should handle default extension', () => {
      const testee = ref({
        enabled: false,
        installed: false,
        activated: false,
        ignored: false,
        type: 'extension',
      } as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/not installed/i);
      expect(status).toMatch(/error/);
    });
  
    it('should handle installed, disabled extension', () => {
      const testee = ref({
        enabled: false,
        installed: true,
        activated: false,
        ignored: false,
        type: 'extension',
      } as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/disabled/i);
      expect(status).toMatch(/error/);
    });
  
    it('should handle installed, enabled extension', () => {
      const testee = ref({
        enabled: true,
        installed: true,
        activated: true,
        ignored: false,
        type: 'extension',
      } as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/active/i);
      expect(status).toMatch(/success/);
    });
  
    it('should handle installed, enabled, ignored extension', () => {
      const testee = ref({
        enabled: true,
        installed: true,
        activated: true,
        ignored: true,
        type: 'extension',
      } as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/ignored/i);
      expect(status).toMatch(/info/);
    });
    
    // TODO: Add more permutations of flag combinations?
  });
  
  describe('settings', () => {
    it('should handle default setting', () => {
      const testee = ref({
        activated: false,
        ignorded: false,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/not set/i);
      expect(status).toMatch(/error/);
    });

    it('should handle activated setting', () => {
      const testee = ref({
        activated: true,
        ignorded: false,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/active/i);
      expect(status).toMatch(/success/);
    });

    it('should handle ignored setting', () => {
      const testee = ref({
        activated: false,
        ignorded: true,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/not set/i);
      expect(status).toMatch(/error/);
    });

    // TODO: Is this a valid test case?
    it('should handle activated, ignored setting', () => {
      const testee = ref({
        activated: true,
        ignorded: true,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/active/i);
      expect(status).toMatch(/success/);
    });
  });
});
