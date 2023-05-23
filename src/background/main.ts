import { onMessage } from 'webext-bridge/background';
import { addExtListeners } from '@/helpers/extensions';
import { CookieData, FPIStatus, removeLetaCookies, setLetaCookies } from '@/helpers/cookies';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Cookie set/remove
// `browser.cookies` operations are only available in the background context
onMessage<CookieData>('leta-login', ({ data }) => {
  setLetaCookies(data);
});

onMessage<FPIStatus>('leta-logout', ({ data }) => {
  removeLetaCookies(data);
});

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
