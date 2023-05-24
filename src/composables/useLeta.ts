import { ref } from 'vue';
import { sendMessage } from 'webext-bridge/popup';

import useStore from './useStore';

const { mullvadAccount } = useStore();
const isFPI = ref(false);

const letaLogin = async () => {
  try {
    await checkFPI();

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
  await checkFPI();
  sendMessage('leta-logout', { isFPI: isFPI.value }, 'background');
  mullvadAccount.value = '';
};

const checkFormat = (value: string): boolean => {
  const containsSixteenDigits = /^(\d[\s-]*){16}$/;

  // TODO  Should we contact the server to check is the account number
  // is a valid Mullvad VPN account with time before saving it?
  return containsSixteenDigits.test(value);
};

export enum FormatType {
  'prettify',
  'clean',
  'hidden',
}

const formatAccount = (accountNumber: string, type: FormatType) => {
  switch (type) {
    case FormatType.clean:
      return accountNumber.replace(/-|\s/g, '');
    case FormatType.hidden:
      return '•••• •••• •••• ••••';
    case FormatType.prettify:
      return accountNumber.match(/.{1,4}/g)!.join(' ');
    default:
      return '';
  }
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
    checkFormat,
    formatAccount,
    letaLogin,
    letaLogout,
    mullvadAccount,
  };
};

export default useLeta;
