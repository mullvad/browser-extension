import { Warning } from './Warning.types';

export const warnings: Warning[] = [
  {
    id: 'doh-disable',
    name: 'Disable Mullvad DoH (encrypted DNS)',
    description: `When you're connected to Mullvad VPN, it's better to use the DNS from the server for geolocation and performance.`,
    ctaUrl: 'https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/#when-to-use',
  },
  {
    id: 'doh-enable',
    name: 'Enable Mullvad DoH (encrypted DNS)',
    description: `When you're not connected to Mullvad VPN, it's better to use an encrypted DNS.`,
    ctaUrl: 'https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/#how-to-use',
  },
  {
    id: 'doh-leak',
    name: 'DoH leaks have been detected',
    description: `Mullvad DoH (encrypted DNS) is set, but your browser still allows unencrypted DNS requests.`,
    ctaUrl: 'https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/#how-to-use',
  },
  {
    id: 'dns-leak',
    name: 'DNS leaks have been detected',
    description: `You're connected to Mullvad VPN, but some DNS requests are leaking outside the VPN tunnel.`,
    ctaUrl: 'https://mullvad.net/en/help/dns-leaks/',
  },
];
