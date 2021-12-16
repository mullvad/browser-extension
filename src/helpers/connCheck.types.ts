export type BlackListResult = {
  blacklisted: boolean;
  link: string;
  name: string;
};

export interface AmIMullvadServerResponse {
  city?: string;
  country?: string;
  ip?: string;
  latitude?: number;
  longitude?: number;
  mullvad_exit_ip?: boolean;
  mullvad_exit_ip_hostname?: string;
  mullvad_server_type?: string;
  organization?: string;
}

export interface Ipv4ServerResponse extends AmIMullvadServerResponse {
  blacklisted?: {
    blacklisted: boolean;
    results: BlackListResult[];
  };
}
