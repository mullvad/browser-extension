import { ref } from 'vue';
import { sendMessage } from 'webext-bridge/popup';

import useStore from './useStore';

const { accountNumber } = useStore();
const isFPI = ref(false);

const letaLogin = async () => {
  try {
    await checkFPI();

    const response = await fetch('https://api.mullvad.net/auth/v1/webtoken', {
      method: 'POST',
      body: JSON.stringify({
        account_number: accountNumber.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { expiry, access_token: accessToken } = await response.json();

    sendMessage(
      'leta-login',
      {
        expiry,
        accessToken,
        isFPI: isFPI.value,
      },
      'background',
    );
  } catch (error) {
    // TODO Handle server error codes
    console.error(error);
  }
};

const letaLogout = () => {
  sendMessage('leta-logout', { isFPI: isFPI.value }, 'background');
};

const checkFPI = async () => {
  try {
    const { value } = await browser.privacy.websites.firstPartyIsolate.get({});
    isFPI.value = value;
  } catch (error) {
    console.error(error);
  }
};

const useLeta = () => {
  return {
    letaLogin,
    letaLogout,
  };
};

export default useLeta;
