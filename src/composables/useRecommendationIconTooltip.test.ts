import { ref } from 'vue';
import { it, describe, expect } from 'vitest';

import useRecommendationIconTooltip from '@/composables/useRecommendationIconTooltip';
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

    it('should handle not-installed, disabled, ignored extension', () => {
      const testee = ref({
        enabled: false,
        installed: false,
        activated: false,
        ignored: true,
        type: 'extension',
      } as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/ignored/i);
      expect(status).toMatch(/info/);
    });

    it('should handle installed, disabled, ignored extension', () => {
      const testee = ref({
        enabled: false,
        installed: true,
        activated: false,
        ignored: true,
        type: 'extension',
      } as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/ignored/i);
      expect(status).toMatch(/info/);
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
  });

  describe('settings', () => {
    it('should handle default setting', () => {
      const testee = ref({
        activated: false,
        ignored: false,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/not set/i);
      expect(status).toMatch(/error/);
    });

    it('should handle activated setting', () => {
      const testee = ref({
        activated: true,
        ignored: false,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/active/i);
      expect(status).toMatch(/success/);
    });

    it('should handle ignored setting', () => {
      const testee = ref({
        activated: false,
        ignored: true,
        type: 'setting',
      } as unknown as Recommendation);
      const { text, status } = useRecommendationIconTooltip(testee).value;
      expect(text).toMatch(/ignored/i);
      expect(status).toMatch(/info/);
    });
  });
});
