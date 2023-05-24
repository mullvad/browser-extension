import { removeLetaCookies, setLetaCookies } from '@/helpers/cookies';

import useFPI from '@/composables/useFPI';
import useStore from '@/composables/useStore';

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

    const response = await fetch('https://api.mullvad.net/auth/v1/webtoken', requestData);
    const { expiry, access_token: accessToken } = await response.json();

    setLetaCookies({
      expiry,
      accessToken,
      isFPI: isFPI.value,
    });
  } catch (error) {
    // TODO Handle server error codes
    console.error(error);
  }
};

const letaLogout = async () => {
  removeLetaCookies({ isFPI: isFPI.value });
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
