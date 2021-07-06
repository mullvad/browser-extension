import { setWebRTC, setSocks, serversToStorage } from '@/helpers';
import { getStorage, StorageKeys } from '@/helpers/localStorage';

init();

async function init() {
  // Add listener on storage change
  browser.storage.onChanged.addListener(handleStorageChange);

  // Debug a component by importing it in the option page
  // and uncomment next line to start it on change
  // browser.runtime.openOptionsPage();

  // Fetch servers list and save it to storage
  serversToStorage();

  // Load socks and webRTC settings from storage
  try {
    const { webrtcDisabled } = await getStorage(StorageKeys.webrtcDisabled);
    const { socksConfig } = await getStorage(StorageKeys.socksConfig);
    const { socksEnabled } = await getStorage(StorageKeys.socksEnabled);

    let isDisabled = webrtcDisabled;
    if (typeof webrtcDisabled === 'undefined') {
      isDisabled = true;
    }

    setWebRTC(isDisabled);
    setSocks(socksEnabled, socksConfig);
  } catch (error) {
    console.log('Error fetching storage in init(): ', error);
  }
}

// Simple logging function for storage update
function handleStorageChange(changes: any, areaName: string) {
  const key: string = Object.keys(changes)[0];
  console.log(`Changes to ${key} in ${areaName}: `, changes);
}
