import { sendMessage } from 'webext-bridge/popup';
import useStore from './useStore';

const { accountNumber } = useStore();

const letaLogin = async () => {
  await fetch('https://api.mullvad.net/auth/v1/webtoken', {
    method: 'POST',
    body: JSON.stringify({ account_number: '2664097547496549' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const expiry = data.expiry;
      const accessToken = data.access_token;

      sendMessage(
        'leta-login',
        {
          expiry,
          accessToken,
        },
        'background',
      );
    })
    .catch((error) => console.error(error));
};

const letaLogout = () => {
  sendMessage('leta-logout', {}, 'background');
};

const useLeta = () => {
  return {
    accountNumber,
    letaLogin,
    letaLogout,
  };
};

export default useLeta;
