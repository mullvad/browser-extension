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
// onMessage<CookieData>('set-leta-cookies', ({ data }) => {
//   console.log('onMessage set-leta-cookies', data);
//   setLetaCookies(data);
// });

// onMessage<FPIStatus>('remove-leta-cookies', ({ data }) => {
//   removeLetaCookies(data);
// });

export const setCookie = async (cookie: browser.cookies._SetDetails) => {
  console.log('setCookie: ', cookie);
  try {
    const setCookie = await browser.cookies.set(cookie);
    console.log({ setCookie });
  } catch (error) {
    console.error(error);
  }
};

export const removeCookie = async (cookieDetails: browser.cookies._RemoveDetails) => {
  console.log('removeCookie: ', cookieDetails);
  try {
    const removeCookie = await browser.cookies.remove(cookieDetails);
    console.log({ removeCookie });
  } catch (error) {
    console.error(error);
  }
};

// onMessage('leta-webrequest', ({ data }) => {
//     Try the web request
//        if it works, profit
//        if not
//           get a session cookie from the API
//           set the session cookie
// });
