import { checkDomain, isValidDomain, normalizeToFQDN, truncateHost } from '@/helpers/domain';

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

  describe('truncateHost', () => {
    it('should return the host as-is when it fits within maxLength', () => {
      expect(truncateHost('example.com')).toBe('example.com');
      expect(truncateHost('mail.google.com')).toBe('mail.google.com');
      expect(truncateHost('www.example.com')).toBe('www.example.com');
    });

    it('should return the host as-is when exactly at maxLength', () => {
      // 21 chars exactly
      const host21 = 'a'.repeat(21);
      expect(truncateHost(host21)).toBe(host21);
    });

    it('should truncate with ellipsis when exceeding maxLength', () => {
      const longHost = 'very-long-subdomain.example.com';
      const result = truncateHost(longHost);
      // slice(0, 20) = 'very-long-subdomain.' (20 chars) + '…' = 21 chars
      expect(result).toBe('very-long-subdomain.…');
      expect(result.length).toBe(21);
    });

    it('should respect custom maxLength', () => {
      // 'example.com' (11 chars), slice(0, 7) = 'example' + '…' = 8 chars
      expect(truncateHost('example.com', 8)).toBe('example…');
      expect(truncateHost('short', 10)).toBe('short');
    });

    it('should handle empty string', () => {
      expect(truncateHost('')).toBe('');
    });

    it('should handle host that is all truncation', () => {
      const veryLong = 'a-really-long-domain-name-that-goes-on-and-on.com';
      const result = truncateHost(veryLong);
      expect(result.length).toBe(21);
      expect(result.endsWith('…')).toBe(true);
    });
  });
});
