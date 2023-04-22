import axios from 'axios';
import type {
  AmIMullvadServerResponse,
  Connection,
  Ipv4ServerResponse,
} from '@/helpers/connCheck.types';

/*
n is an optional parameter to retry the connCheck any number of time.

By default, it will retry twice because after connecting/disconnecting to/from Mullvad server, the first request results in a NetworkError and the second is successful.

It's a workaround for the following bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1706377
*/

export const connCheck = async (n = 3): Promise<Connection> => {
  try {
    const { data } = await axios.get<Ipv4ServerResponse>('https://ipv4.am.i.mullvad.net/json', {
      timeout: 6000, // with two tries, the max total time  will be over the 10s of the bug (see link above)
    });

    let ipv6;
    try {
      const { data: ipv6Data } = await axios.get<AmIMullvadServerResponse>(
        'https://ipv6.am.i.mullvad.net/json',
      );
      ipv6 = ipv6Data.ip;
    } catch (e) {
      if (__DEV__) {
        console.log(`[conCheck IPv6]: Error trying to get ipv6 data: ${(e as Error).message}`);
      }
    }

    return {
      city: data.city,
      country: data.country,
      ip: data.ip,
      ipv6,
      server: data.mullvad_exit_ip_hostname,
      protocol: data.mullvad_server_type,
      provider: data.organization,
      isMullvad: data.mullvad_exit_ip ?? null,
    };
  } catch (error) {
    if (n === 1) throw new Error('Connection check failed.');
    return connCheck(n - 1);
  }
};
