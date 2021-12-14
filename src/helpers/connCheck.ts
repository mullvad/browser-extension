import axios from 'axios';

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
  ipv6: string;
  server?: string;
  protocol?: string;
  provider: string;
  isMullvad: boolean;
}

export interface SocksProtocols {
  previous?: string;
  current: string;
}

export const connCheck = async (n = 3): Promise<Connection> => {
  try {
    const { data } = await axios.get(CONN_URL, {
      timeout: 6000, // with two tries, the max total time  will be over the 10s of the bug (see link above)
    });

    let ipv4Data;
    try {
      ipv4Data = await axios.get('https://ipv4.am.i.mullvad.net/json');
    } catch (e) {
      console.log({ e });
    }
    
    let ipv6Data;
    try {
      ipv6Data = await axios.get('https://ipv6.am.i.mullvad.net/json');
    } catch (e) {
      console.log({ e });
    }

    return {
      city: data.city || '',
      country: data.country || '',
      ip: ipv4Data?.data.ip ?? data.ip,
      ipv6: ipv6Data?.data.ip ?? '',
      server: data.mullvad_exit_ip_hostname,
      protocol: data.mullvad_server_type,
      provider: data.organization,
      isMullvad: data.mullvad_exit_ip,
    };
  } catch (error) {
    if (n === 1) throw new Error('Connection check failed.');
    return connCheck(n - 1);
  }
};
