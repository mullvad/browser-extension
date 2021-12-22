const DEFAULT_WIRE_GUARD_IP = '10.64.0.1';
const DEFAULT_OPEN_VPN_IP = '10.8.0.1';

const protocols: { [key: string]: string } = {
  WireGuard: DEFAULT_WIRE_GUARD_IP,
  'SOCKS through WireGuard': DEFAULT_WIRE_GUARD_IP,
  OpenVPN: DEFAULT_OPEN_VPN_IP,
  'SOCKS through OpenVPN': DEFAULT_OPEN_VPN_IP,
};

const getSocksIpForProtocol = (protocol?: string) => {
  if (!protocol) {
    throw new Error(`Can't get socks ip without protocol`);
  }
  const ip = protocols[protocol];
  if (!ip) {
    throw new Error(`Unknown protocol ${protocol}`);
  }
  return ip;
};

export default getSocksIpForProtocol;
