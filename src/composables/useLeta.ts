import { sendMessage } from 'webext-bridge/popup';
import useStore from '@/composables/useStore';

const { mullvadAccount } = useStore();

const login = async () => {
  sendMessage('leta-login', {}, 'background');
};

const logout = async () => {
  sendMessage('leta-logout', {}, 'background');
  mullvadAccount.value = '';
};

const useLeta = () => {
  return {
    login,
    logout,
    account: mullvadAccount,
  };
};

export default useLeta;
