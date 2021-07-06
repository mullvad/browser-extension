import axios from 'axios';
import { getStorage, setStorage, StorageKeys } from './localStorage';

const CONN_URL = 'https://am.i.mullvad.net/json';

/*
n is an optional parameter to retry the connCheck any number of time.

By default, it will retry twice because after connecting/disconnecting to/from Mullvad server, the first request results in a NetworkError and the second is successful.

It's a workaround for the following bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1706377
*/

export interface Connection {
  city: string;
  country: string;
  ip: string;
  server?: string;
  protocol?: string;
  provider: string;
  isMullvad: boolean;
}

export const connCheck = async (n = 2): Promise<Connection> => {
  try {
    const { data } = await axios.get(CONN_URL);

    // Keep track of procotols used previously
    // Used to detect a mismatch when switching from one to another
    const { socksProtocols } = await getStorage(StorageKeys.socksProtocols);

    if (socksProtocols !== undefined) {
      setStorage(StorageKeys.socksProtocols, {
        previous: socksProtocols.current,
        current: data.mullvad_server_type,
      });
    } else {
      setStorage(StorageKeys.socksProtocols, {
        current: data.mullvad_server_type,
      });
    }

    // TODO: Set connection to storage directly here

    return {
      city: data.city || '',
      country: data.country || '',
      ip: data.ip,
      server: data.mullvad_exit_ip_hostname,
      protocol: data.mullvad_server_type,
      provider: data.organization,
      isMullvad: data.mullvad_exit_ip,
    };
  } catch (error) {
    console.error('Error connCheck()', error);

    if (n === 1) throw error;
    return connCheck(n - 1);
  }
};
