import type {
  AmIMullvadServerResponse,
  Connection,
  Ipv4ServerResponse,
} from '@/helpers/connCheck.types';
import { getConfig } from '@/helpers/config';

export const connCheckIpv4 = async (): Promise<Connection> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const { ipv4_url } = await getConfig();
    const response = await fetch(`${ipv4_url}/json`, {
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
  } catch (error) {
    throw new Error('IPv4 connection check failed.', { cause: error });
  }
};

export const connCheckIpv6 = async (): Promise<string | undefined> => {
  try {
    const { ipv6_url } = await getConfig();
    const response = await fetch(`${ipv6_url}/json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: AmIMullvadServerResponse = await response.json();
    return data.ip;
  } catch (e) {
    if (import.meta.env.DEV) {
      console.log(`[conCheck IPv6]: Error trying to get ipv6 data: ${(e as Error).message}`);
    }
    return undefined;
  }
};
