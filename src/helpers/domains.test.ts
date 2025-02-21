import { checkDomain, isValidDomain, normalizeToFQDN } from '@/helpers/domain';

describe('domain helpers', () => {
  describe('checkDomain', () => {
    it('should handle domain without subdomain', () => {
      const result = checkDomain('example.com');
      expect(result).toEqual({
        hasSubdomain: false,
        subDomain: 'example.com',
        domain: 'example.com',
      });
    });

    it('should handle domain with subdomain', () => {
      const result = checkDomain('www.torproject.org');
      expect(result).toEqual({
        hasSubdomain: true,
        subDomain: 'www.torproject.org',
        domain: 'torproject.org',
      });
    });
  });

  describe('isValidDomain', () => {
    it('should return true for valid domains', () => {
      expect(isValidDomain('mullvad.net')).toBe(true);
      expect(isValidDomain('am.i.mullvad.net')).toBe(true);
    });

    it('should return false for invalid domains', () => {
      expect(isValidDomain('not-a-domain')).toBe(false);
      expect(isValidDomain('not-a-domain.blabla')).toBe(false);
      expect(isValidDomain('')).toBe(false);
    });

    it('should return true for special use domains', () => {
      expect(isValidDomain('home.arpa')).toBe(true);
      expect(isValidDomain('example.test')).toBe(true);
      expect(isValidDomain('server.localhost')).toBe(true);
      expect(isValidDomain('page.internal')).toBe(true);
    });
  });

  describe('normalizeToFQDN', () => {
    it('should return normalized FQDN for valid domains', () => {
      expect(normalizeToFQDN('https://example.com')).toBe('example.com');
      expect(normalizeToFQDN('www.example.com')).toBe('www.example.com');
      expect(normalizeToFQDN('sub.domain.example.com')).toBe('sub.domain.example.com');
    });

    it('should return null for invalid domains', () => {
      expect(normalizeToFQDN('')).toBeNull();
      expect(normalizeToFQDN('invalid..domain')).toBeNull();
    });
  });
});
