import getSocksIpForProtocol from '@/composables/utils/getSocksIpForProtocol';

const DEFAULT_WIRE_GUARD_IP = '10.64.0.1';
const DEFAULT_OPEN_VPN_IP = '10.8.0.1';

describe('getSocksIpForProtocol', () => {
  it('should throw error for missing protocol', () => {
    expect(() => getSocksIpForProtocol()).toThrowError(`Can't get socks ip without protocol`);
    expect(() => getSocksIpForProtocol('ftp')).toThrowError(`Unknown protocol ftp`);
  });
  
  it('should return correct ip', () => {
    expect(getSocksIpForProtocol('WireGuard')).toBe(DEFAULT_WIRE_GUARD_IP);
    expect(getSocksIpForProtocol('SOCKS through WireGuard')).toBe(DEFAULT_WIRE_GUARD_IP);
    
    expect(getSocksIpForProtocol('OpenVPN')).toBe(DEFAULT_OPEN_VPN_IP);
    expect(getSocksIpForProtocol('SOCKS through OpenVPN')).toBe(DEFAULT_OPEN_VPN_IP);
  
    expect(() => getSocksIpForProtocol('Wireguard')).toThrowError(`Unknown protocol Wireguard`);
    expect(() => getSocksIpForProtocol('Wire Guard')).toThrowError(`Unknown protocol Wire Guard`);
  
  });
});
