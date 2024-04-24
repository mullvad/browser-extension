import type {
  AmIMullvadServerResponse,
  Connection,
  Ipv4ServerResponse,
} from '@/helpers/connCheck.types';

/*
n is an optional parameter to retry the connCheck any number of time.

By default, it will retry twice because after connecting/disconnecting to/from Mullvad server, the first request results in a NetworkError and the second is successful.

It's a workaround for the following bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1706377
Workaround can be removed when Mullvad Browser 14.0 is released (the bug is fixed!).
*/

export const connCheck = async (n = 3): Promise<Connection> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://ipv4.am.i.mullvad.net/json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const data: Ipv4ServerResponse = await response.json();

    let ipv6;
    try {
      const ipv6Response = await fetch('https://ipv6.am.i.mullvad.net/json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const ipv6Data: AmIMullvadServerResponse = await ipv6Response.json();
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
      isMullvad: data.mullvad_exit_ip ?? false,
    };
  } catch (error) {
    if (n === 1) throw new Error('Connection check failed.');
    return connCheck(n - 1);
  }
};
