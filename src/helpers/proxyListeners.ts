import { getProxyPermissions } from '@/helpers/permissions';
import { updateCurrentTabProxyBadge, updateTabProxyBadge } from '@/helpers/proxyBadge';
import { handleProxyRequest } from '@/helpers/socksProxy';
import { getActiveProxyDetails } from './tabs';

export const initProxyListeners = () => {
  // Will init listeners on extension start if permissions are granted
  initListeners();

  // Will monitor permissions changes and update proxy accordingly
  browser.permissions.onAdded.addListener(initListeners);
  browser.permissions.onRemoved.addListener(cleanListeners);
};

const initListeners = async () => {
  const proxyPermissionsGranted = await getProxyPermissions();

  if (proxyPermissionsGranted) {
    updateCurrentTabProxyBadge();

    // Initialize tab listeners
    browser.tabs.onActivated.addListener(handleActivedTab);
    browser.tabs.onUpdated.addListener(handleUpdatedTab);

    // Initialize proxy request listener
    browser.proxy.onRequest.addListener(handleProxyRequest, { urls: ['<all_urls>'] });
  }
};

const cleanListeners = async () => {
  const proxyPermissionsGranted = await getProxyPermissions();

  if (!proxyPermissionsGranted) {
    // Clear the badge for all tabs
    // TODO Add a notification to warn the user the proxy has been deactivated
    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (tab.id !== undefined) {
        browser.browserAction.setBadgeText({ text: '', tabId: tab.id });
      }
    }

    // Remove tab listeners
    browser.tabs.onActivated.removeListener(handleActivedTab);
    browser.tabs.onUpdated.removeListener(handleUpdatedTab);

    // Remove proxy request listener
    browser.proxy.onRequest.removeListener(handleProxyRequest);
  }
};

const handleActivedTab = async (activeInfo: browser.tabs._OnActivatedActiveInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  updateTabProxyBadge(tab, await getActiveProxyDetails());
};

const handleUpdatedTab = async (
  _tabId: number,
  _changeInfo: browser.tabs._OnUpdatedChangeInfo,
  tab: browser.tabs.Tab,
) => {
  updateTabProxyBadge(tab, await getActiveProxyDetails());
};
