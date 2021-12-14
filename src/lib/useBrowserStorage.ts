import { storage } from 'webextension-polyfill';

const get = async (key: string) => {
  const data = await storage.local.get(key);
  return data[key];
};

export function useBrowserStorage<T>(key: string, initialValue: T) {
  const data = ref(initialValue);
  
  // First data read from storage
  get(key).then(
    (storedValue) => {
      if (storedValue) {
        data.value = storedValue;
      }
    },
    (error) => {
      throw error;
    },
  );
  
  // Update local reactive state
  storage.onChanged.addListener((changes) => {
    if (Object.keys(changes).includes(key)) {
      data.value = changes[key].newValue;
    }
  });
  
  // Update storage
  watch(
    data,
    async () => {
      const { value } = data;
      if (value === null || value === undefined) {
        await storage.local.remove(key);
      } else {
        const currentValue = await get(key);
        
        if (value !== currentValue) {
          await storage.local.set({
            [key]: value,
          });
        }
      }
    },
    {
      deep: true,
    },
  );
  
  return data;
}
