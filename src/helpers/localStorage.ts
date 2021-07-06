export { getStorage, setStorage, removeStorage };

export enum StorageKeys {
  webrtcDisabled = 'webrtcDisabled',
  servers = 'servers',
  connection = 'connection',
  socksConfig = 'socksConfig',
  socksEnabled = 'socksEnabled',
  socksProtocols = 'socksProtocols',
}

const getStorage = async function (key: StorageKeys) {
  return browser.storage.local.get(key);
};

const removeStorage = async function (key: StorageKeys) {
  return browser.storage.local.remove(key);
};

const setStorage = async function (key: StorageKeys, value: any) {
  // Clean object from Vue getter/setter
  const object = JSON.parse(JSON.stringify(value));
  return browser.storage.local.set({ [key]: object });
};
