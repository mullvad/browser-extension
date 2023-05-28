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

const logURL = (details: browser.webRequest._OnBeforeRequestDetails) => {
  console.log(`Intercepted request to: ${details.url}`, details.requestId);

  browser.cookies.getAll({ url: 'https://leta.mullvad.net' }).then((cookies) => {
    const expiry = cookies
      .filter((cookie) => cookie.name === 'letaCookieExpiry')
      .map((cookie) => cookie.value)[0];

    console.log('logURL: ', expiry);

    if (expiry && new Date(expiry) > new Date()) {
      // If not, forward request
      console.log('Session valid');
      return { cancel: true };
    } else {
      console.log('Session expired');
      return { cancel: false };
    }
  });
};

browser.webRequest.onBeforeRequest.addListener(logURL, { urls: ['https://leta.mullvad.net/*'] }, [
  'blocking',
]);
