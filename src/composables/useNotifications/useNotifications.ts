import { computed } from 'vue';

import useConnection from '@/composables/useConnection';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import { notifications } from '@/composables/useNotifications/notifications';

const { isMullvadDoh, isthirdPartyDns } = useCheckDnsLeaks();
const { connection } = useConnection();

const dohDisable = computed(() => connection.value.isMullvad && isMullvadDoh.value);
const dohEnable = computed(() => !connection.value.isMullvad && !isMullvadDoh.value);
const dohLeak = computed(() => isMullvadDoh.value && isthirdPartyDns.value);
const dnsLeak = computed(() => connection.value.isMullvad && isthirdPartyDns.value);

const activeNotifications = computed(() => {
  const activeNotificationsIds: string[] = [];

  if (dohDisable.value) {
    activeNotificationsIds.push('doh-disable');
  }
  if (dohEnable.value) {
    activeNotificationsIds.push('doh-enable');
  }
  if (dohLeak.value) {
    activeNotificationsIds.push('doh-leak');
  }
  if (dnsLeak.value) {
    activeNotificationsIds.push('dns-leak');
  }

  return notifications.filter((notification) => activeNotificationsIds.includes(notification.id));
});

const useNotifications = () => {
  return {
    activeNotifications,
  };
};

export default useNotifications;
