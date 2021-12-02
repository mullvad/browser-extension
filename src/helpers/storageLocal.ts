import { Connection, SocksProtocols } from './connCheck';
import { Extension } from './extensions';
import { Servers } from './servers';
import { SocksConfig } from './socks';

const createStorageMethodsForKey = <T>(key: string, defaultValue: T) => {
  return {
    set: getSetter<T>(key),
    get: getGetter<T>(key, defaultValue),
    remove: getRemover(key),
  };
};

const getSetter = <T>(key: string): ((value: T) => Promise<void>) => {
  return (value: T) => {
    return browser.storage.local.set({ [key]: value });
  };
};

const getGetter = <T>(key: string, defaultValue: T): (() => Promise<T>) => {
  return async () => {
    const value = (await browser.storage.local.get(key))[key] as T;
    if (typeof value === 'undefined') {
      return defaultValue;
    } else {
      return value;
    }
  };
};

const getRemover = (key: string): (() => Promise<void>) => {
  return () => browser.storage.local.remove(key);
};

export const storageLocal = {
  connection: createStorageMethodsForKey<Connection | undefined>('connection', undefined),
  extensions: createStorageMethodsForKey<Extension[]>('extensions', []),
  servers: createStorageMethodsForKey<Servers>('servers', {}),
  showConnDetails: createStorageMethodsForKey<boolean>('showConnDetails', false),
  socksConfig: createStorageMethodsForKey<SocksConfig | undefined>('socksConfig', undefined),
  socksEnabled: createStorageMethodsForKey<boolean>('socksEnabled', false),
  socksProtocols: createStorageMethodsForKey<SocksProtocols>('socksProtocols', { current: '' }),
  webrtcDisabled: createStorageMethodsForKey<boolean>('webrtcDisabled', true),
};
