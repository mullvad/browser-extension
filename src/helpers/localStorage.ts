import { Connection, SocksProtocols } from './connCheck';
import { Servers } from './servers';
import { SocksConfig } from './socks';

export const localStorage = {
  webrtcDisabled: createStorageMethodsForKey<boolean>('webrtcDisabled', true),
  servers: createStorageMethodsForKey<Servers>('servers', {}),
  socksConfig: createStorageMethodsForKey<SocksConfig | undefined>('socksConfig', undefined),
  socksEnabled: createStorageMethodsForKey<boolean>('socksEnabled', false),
  socksProtocols: createStorageMethodsForKey<SocksProtocols>('socksProtocols', { current: '' }),
  connection: createStorageMethodsForKey<Connection | undefined>('connection', undefined),
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
    // Clean object from Vue getter/setter
    const cleanedValue = JSON.parse(JSON.stringify(value));
    return browser.storage.local.set({ [key]: cleanedValue });
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
