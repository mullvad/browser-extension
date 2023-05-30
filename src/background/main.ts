import { addExtListeners } from '@/helpers/extensions';
import { initLetaLogin } from '@/helpers/initLeta';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Mullvad Leta Auto Login on extension start
initLetaLogin();

// Add cookie messaging listeners
// `browser.cookies` operations are only available in the background context

export const setCookie = async (cookie: browser.cookies._SetDetails) => {
  try {
    await browser.cookies.set(cookie);
  } catch (error) {
    console.error(error);
  }
};

export const removeCookie = async (cookieDetails: browser.cookies._RemoveDetails) => {
  try {
    await browser.cookies.remove(cookieDetails);
  } catch (error) {
    console.error(error);
  }
};
