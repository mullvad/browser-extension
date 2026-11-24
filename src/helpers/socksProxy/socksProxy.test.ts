import { it, describe, expect } from 'vitest';

import { isExtConnCheck, isLocalOrReservedIP } from '@/helpers/socksProxy/socksProxy';
import { DEFAULT_CONFIG } from '@/helpers/config';
import { RequestDetails } from './socksProxy.types';

vi.mock('@/helpers/getRandomSessionProxy', () => ({
  browserStorage: {
    getLocal: vi.fn().mockResolvedValue({}),
  },
}));

describe('isLocalOrReservedIP', () => {
  it('should return true for localhost', () => {
    expect(isLocalOrReservedIP('localhost:8080')).toBeTruthy();
  });

  it('should return true for private IP', () => {
    expect(isLocalOrReservedIP('192.168.1.1')).toBeTruthy();
  });

  it('should return true for loopback IP', () => {
    expect(isLocalOrReservedIP('127.0.0.1')).toBeTruthy();
    expect(isLocalOrReservedIP('::1')).toBeTruthy();
  });

  it('should return true for bracketed IPv6', () => {
    expect(isLocalOrReservedIP('[::1]')).toBeTruthy();
    expect(isLocalOrReservedIP('[fc00::1]')).toBeTruthy();
  });

  it('should return false for public IP', () => {
    expect(isLocalOrReservedIP('8.8.8.8')).toBeFalsy();
  });

  it('should return false for domains that contain the localhost substring', () => {
    expect(isLocalOrReservedIP('notlocalhost.com')).toBeFalsy();
    expect(isLocalOrReservedIP('localhost.attacker.tld')).toBeFalsy();
    expect(isLocalOrReservedIP('prod-localhost-cdn.example')).toBeFalsy();
  });

  it('should return false for invalid IP', () => {
    expect(isLocalOrReservedIP('invalid.ip')).toBeFalsy();
  });

  it('should return true for unique local addresses', () => {
    expect(isLocalOrReservedIP('fc00::')).toBeTruthy();
  });

  it('should return true for multicast addresses', () => {
    expect(isLocalOrReservedIP('ff00::')).toBeTruthy();
  });

  it('should return false when IP address is not provided', () => {
    expect(isLocalOrReservedIP('')).toBeFalsy();
  });
});

describe('isExtConnCheck', () => {
  const baseDetails: RequestDetails = {
    requestId: '5979',
    url: '',
    method: 'GET',
    type: 'xmlhttprequest',
    fromCache: false,
    incognito: false,
    thirdParty: false,
    originUrl: '',
    documentUrl: '',
    frameId: 0,
    parentFrameId: -1,
    frameAncestors: [],
    timeStamp: 1740215207080,
    tabId: 4,
    cookieStoreId: 'firefox-default',
    urlClassification: {
      firstParty: [],
      thirdParty: [],
    },
  };

  it('should return true for extension IPv4 connection check', () => {
    const details: RequestDetails = {
      ...baseDetails,
      url: `${DEFAULT_CONFIG.ipv4_url}/json`,
      originUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
      documentUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
    };
    expect(isExtConnCheck(details)).toBeTruthy();
  });

  it('should return true for extension IPv6 connection check', () => {
    const details: RequestDetails = {
      ...baseDetails,
      url: `${DEFAULT_CONFIG.ipv6_url}/json`,
      originUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
      documentUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
    };
    expect(isExtConnCheck(details)).toBeTruthy();
  });

  it('should return true for extension DNS check', () => {
    const details: RequestDetails = {
      ...baseDetails,
      url: `https://c30d3da2-fc4f-4732-86cc-f233e1692eac.${DEFAULT_CONFIG.dns_leak_domain}/`,
      originUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
      documentUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
    };
    expect(isExtConnCheck(details)).toBeTruthy();
  });

  it('should return true for a dynamic DNS leak domain provided via config', () => {
    const dynamicConfig = {
      ...DEFAULT_CONFIG,
      dns_leak_domain: 'dnsleak.dk-cph-conncheck-001.mullvad.net',
    };
    const details: RequestDetails = {
      ...baseDetails,
      url: 'https://c30d3da2-fc4f-4732-86cc-f233e1692eac.dnsleak.dk-cph-conncheck-001.mullvad.net/',
      originUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
      documentUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
    };
    expect(isExtConnCheck(details, dynamicConfig)).toBeTruthy();
  });

  it('should return false for DNS check with the wrong base domain', () => {
    const details: RequestDetails = {
      ...baseDetails,
      url: 'https://example.com#am.i.mullvad.net/',
      originUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
      documentUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
    };
    expect(isExtConnCheck(details)).toBeFalsy();
  });

  it('should return false for non-extension requests', () => {
    const details: RequestDetails = {
      ...baseDetails,
      url: 'https://ipv4.am.i.mullvad.net/json',
      documentUrl: 'https://example.com',
      originUrl: 'https://example.com',
    };
    expect(isExtConnCheck(details)).toBeFalsy();
  });

  it('should return false for extension requests to other URLs', () => {
    const details: RequestDetails = {
      ...baseDetails,
      url: 'https://example.com',
      originUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
      documentUrl: 'moz-extension://8ad8e256-a9a0-4017-b302-1345ac426553/dist/options/index.html',
    };
    expect(isExtConnCheck(details)).toBeFalsy();
  });
});
