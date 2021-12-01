import { Extension } from './extensions';
import { Servers } from './servers';

export const localStorage = {
  servers: createStorageMethodsForKey<Servers>('servers', {}),
  extensions: createStorageMethodsForKey<Extension[]>('extensions', []),
};

function createStorageMethodsForKey<T>(key: string, defaultValue: T) {
  return {
    set: getSetter<T>(key),
    get: getGetter<T>(key, defaultValue),
    remove: getRemover(key),
  };
}

function getSetter<T>(key: string): (value: T) => Promise<void> {
  return (value: T) => {
    return browser.storage.local.set({ [key]: value });
  };
}

function getGetter<T>(key: string, defaultValue: T): () => Promise<T> {
  return async () => {
    const value = (await browser.storage.local.get(key))[key] as T;
    if (typeof value === 'undefined') {
      return defaultValue;
    } else {
      return value;
    }
  };
}

function getRemover(key: string): () => Promise<void> {
  return () => browser.storage.local.remove(key);
}

// export function cleanObject(obj: any): any {
//   // Clean object from Vue getter/setter
//   // Useful when logging or before saving to storage
//   return JSON.parse(JSON.stringify(obj));
// }
