import { useStorageAsync, Awaitable } from '@vueuse/core';
import { storage } from 'webextension-polyfill';

interface BrowserStorageLocal {
  getItem(key: string): Awaitable<string | null>;
  setItem(key: string, value: string): Awaitable<void>;
  removeItem(key: string): Awaitable<void>;
}

const browserStorageLocal: BrowserStorageLocal = {
  removeItem(key: string) {
    return storage.local.remove(key);
  },
  
  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value });
  },
  
  async getItem(key: string) {
    return (await storage.local.get(key))[key];
  }
};

const useBrowserStorageLocal = <T>(key: string, initialValue: T) => {
  return useStorageAsync(key, initialValue, browserStorageLocal);
};

export default useBrowserStorageLocal;
