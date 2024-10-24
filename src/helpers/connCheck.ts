import type {
  AmIMullvadServerResponse,
  Connection,
  Ipv4ServerResponse,
} from '@/helpers/connCheck.types';

/*
By default, it will retry twice because after connecting/disconnecting to/from Mullvad server, the first request results in a NetworkError and the second is successful.

It's a workaround for the following bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1706377
Workaround can be removed when Mullvad Browser 14.0 is released (the bug is fixed!).
*/
const MAX_RETRIES = 3;

export const connCheckIpv4 = async (retries = MAX_RETRIES): Promise<Connection> => {
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

    return {
      city: data.city,
      country: data.country,
      ip: data.ip,
      server: data.mullvad_exit_ip_hostname,
      protocol: data.mullvad_server_type,
      provider: data.organization,
      isMullvad: data.mullvad_exit_ip ?? false,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    if (retries === 1) throw new Error('IPv4 connection check failed.');
    return connCheckIpv4(retries - 1);
  }
};

export const connCheckIpv6 = async (retries = MAX_RETRIES): Promise<string | undefined> => {
  try {
    const response = await fetch('https://ipv6.am.i.mullvad.net/json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: AmIMullvadServerResponse = await response.json();
    return data.ip;
  } catch (e) {
    if (__DEV__) {
      console.log(`[conCheck IPv6]: Error trying to get ipv6 data: ${(e as Error).message}`);
    }
    if (retries === 1) return undefined;
    return connCheckIpv6(retries - 1);
  }
};
