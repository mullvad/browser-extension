import { setWebRTC, setSocks, serversToStorage } from '@/helpers';
import { cleanObject, localStorage } from '@/helpers/localStorage';
import { onDisable, onEnable, onInstall, onUninstall } from './helpers/extensions';

init();

async function init() {
  // Debug a component by importing it in the option page
  // and uncomment next line to start it on change
  // browser.runtime.openOptionsPage();

  // Add listener on storage change
  browser.storage.onChanged.addListener(handleStorageChange);

  // Add listener on extension action
  browser.management.onInstalled.addListener(onInstall);
  browser.management.onUninstalled.addListener(onUninstall);
  browser.management.onEnabled.addListener(onEnable);
  browser.management.onDisabled.addListener(onDisable);

  // Fetch servers list and save it to storage
  serversToStorage();

  // Load socks and webRTC settings from storage
  try {
    const webrtcDisabled = await localStorage.webrtcDisabled.get();
    const socksConfig = await localStorage.socksConfig.get();
    const socksEnabled = await localStorage.socksEnabled.get();
    const extensionsConfig = await localStorage.extensions.get();

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
  console.log(`Changes to ${key} in ${areaName}: `, cleanObject(changes));
}
