import { ref } from 'vue';
import { onMessage, sendMessage } from 'webext-bridge/popup';

import { DataAccount, MullvadAccount } from '@/helpers/leta';
import { FormatType, formatAccount } from '@/helpers/account';
import useStore from '@/composables/useStore';

const { mullvadAccount } = useStore();
const invalidError = ref(false);

onMessage('invalid-account', async () => {
  invalidError.value = true;
});

onMessage<DataAccount>('login-success', async ({ data }) => {
  const { account } = data;
  invalidError.value = false;
  // Save account to extension storage
  mullvadAccount.value = formatAccount(account, FormatType.clean);
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
    invalidError,
    login,
    logout,
  };
};

export default useLeta;
