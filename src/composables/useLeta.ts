import { ref } from 'vue';
import { onMessage, sendMessage } from 'webext-bridge/popup';

import { DataAccount, MullvadAccount } from '@/helpers/leta';
import useStore from '@/composables/useStore';

const { mullvadAccount } = useStore();
const loginError = ref({ error: false, message: '' });

type DataError = {
  error: boolean;
  message: string;
};

onMessage<DataError>('login-error', async ({ data }) => {
  const { message } = data;
  loginError.value = { error: true, message };
});

onMessage<DataAccount>('login-success', async ({ data }) => {
  const { account } = data;
  loginError.value = { error: false, message: '' };
  // Save account to extension storage
  mullvadAccount.value = account;
});

const login = async (account: MullvadAccount) => {
  sendMessage<MullvadAccount>('leta-login', { account }, 'background');
};

const logout = async () => {
  sendMessage('leta-logout', {}, 'background');
  mullvadAccount.value = '';
};

const useLeta = () => {
  return {
    account: mullvadAccount,
    loginError,
    login,
    logout,
  };
};

export default useLeta;
