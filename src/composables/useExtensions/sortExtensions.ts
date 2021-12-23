import { Extension } from '@/composables/useExtensions/Extension.types';

/**
 * Sort in the following order:
 * 1. to install
 * 2. disabled
 * 3. ignored
 * 4. installed
 * 5. by name
 * @param extensions
 */
const sortExtensions = (extensions: Extension[]) => {
  // Make sure we don't mutate the original array!
  return [...extensions].sort((a, b) => {
    if (a.installed === b.installed) {
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
    return a.installed ? 1 : -1;
  });
};

export default sortExtensions;
