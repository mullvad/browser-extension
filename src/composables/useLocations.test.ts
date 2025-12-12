import useLocations from '@/composables/useLocations';
import { it, describe, expect } from 'vitest';

describe('useLocations', () => {
  it('should default to false and toggle', () => {
    const { showLocations, toggleLocations } = useLocations();
    expect(showLocations.value).toBe(false);

    toggleLocations();
    expect(showLocations.value).toBe(true);
  });
});
