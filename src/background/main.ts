import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import { getMullvadAccount, initLetaLogin, letaLogin, letaLogout } from '@/helpers/leta';

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
onMessage('leta-login', async () => {
  const account = await getMullvadAccount();
  letaLogin(account);
});

onMessage('leta-logout', () => {
  letaLogout();
});

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

// const logURL = (details: browser.webRequest._OnBeforeRequestDetails) => {
//   console.log(`Intercepted request to: ${details.url}`, details.requestId);

//   // Check if there's an account number available

//   browser.cookies.getAll({ url: 'https://leta.mullvad.net' }).then((cookies) => {
//     const expiry = cookies
//       .filter((cookie) => cookie.name === 'letaCookieExpiry')
//       .map((cookie) => cookie.value)[0];

//     console.log('logURL: ', expiry);

//     if (expiry && new Date(expiry) > new Date()) {
//       // There's a cookie and it expires in the future
//       console.log('Session valid');
//       return { cancel: true };
//     } else {
//       // There's no auth cookie
//       // Create an auth cookie
//       letaLogin();
//       // continue
//       console.log('Session expired');
//       return { cancel: false };
//     }
//   });
// };

// browser.webRequest.onBeforeRequest.addListener(logURL, { urls: ['https://leta.mullvad.net/*'] }, [
//   'blocking',
// ]);
