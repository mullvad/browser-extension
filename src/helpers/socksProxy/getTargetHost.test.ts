import { ProxyDetails } from '@/helpers/socksProxy/socksProxy.types';
import { getTargetHost } from '@/helpers/socksProxy/getTargetHost';

const proxyDetails: Record<string, ProxyDetails> = {
  'youtube.com': {
    socksEnabled: false,
    server: 'al-tia-wg-002',
    country: 'Albania',
    countryCode: 'al',
    city: 'Tirana',
    proxyDNS: true,
  },
  'mullvad.net': {
    socksEnabled: true,
    server: 'at-vie-wg-001',
    country: 'Austria',
    countryCode: 'at',
    city: 'Vienna',
    proxyDNS: true,
  },
  'torproject.org': {
    socksEnabled: true,
    server: 'br-sao-wg-201',
    country: 'Brazil',
    countryCode: 'br',
    city: 'Sao Paulo',
    proxyDNS: true,
  },
  'www.torproject.org': {
    socksEnabled: true,
    server: 'hr-zag-wg-001',
    country: 'Croatia',
    countryCode: 'hr',
    city: 'Zagreb',
    proxyDNS: true,
  },
};

describe('getTargetHost', () => {
  test('returns exact host when it exists in proxy details', () => {
    expect(getTargetHost('youtube.com', proxyDetails)).toBe('youtube.com');
    expect(getTargetHost('mullvad.net', proxyDetails)).toBe('mullvad.net');
  });

  test('returns domain when subdomain exists and domain has proxy', () => {
    expect(getTargetHost('www.youtube.com', proxyDetails)).toBe('youtube.com');
    expect(getTargetHost('sub.mullvad.net', proxyDetails)).toBe('mullvad.net');
  });

  test('returns exact subdomain host when it exists in proxy details', () => {
    expect(getTargetHost('www.torproject.org', proxyDetails)).toBe('www.torproject.org');
  });

  test('returns original host when no match found', () => {
    expect(getTargetHost('nonexistent.com', proxyDetails)).toBe('nonexistent.com');
    expect(getTargetHost('test.nonexistent.com', proxyDetails)).toBe('test.nonexistent.com');
  });
});
