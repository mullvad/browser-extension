import { sendMessage } from 'webext-bridge/popup';

import useFPI from './useFPI';
import useStore from './useStore';

const { isFPI } = useFPI();
const { mullvadAccount } = useStore();

const letaLogin = async () => {
  try {
    const requestData = {
      method: 'POST',
      body: JSON.stringify({
        account_number: mullvadAccount.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log('letaLogin: ', { requestData });

    const response = await fetch('https://api.mullvad.net/auth/v1/webtoken', requestData);
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

const letaLogout = async () => {
  sendMessage('leta-logout', { isFPI: isFPI.value }, 'background');
  mullvadAccount.value = '';
};

const useLeta = () => {
  return {
    letaLogin,
    letaLogout,
    mullvadAccount,
  };
};

export default useLeta;
