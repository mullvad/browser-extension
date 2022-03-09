import { Recommendation } from './Recommendation.types';

/**
 * Sort in the following order:
 * 1. to install
 * 2. disabled
 * 3. ignored
 * 4. activated
 * 5. by name
 * @param recommendations
 */
const sortRecommendations = (recommendations: Recommendation[]) => {
  // Make sure we don't mutate the original array!
  return [...recommendations].sort((a, b) => {
    if (a.activated === b.activated) {
      if (a.enabled === b.enabled) {
        if (a.ignored === b.ignored) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else {
          return a.ignored ? 1 : -1;
        }
      } else {
        return a.enabled ? 1 : -1;
      }
    }
    return a.activated ? 1 : -1;
  });
};

export default sortRecommendations;
