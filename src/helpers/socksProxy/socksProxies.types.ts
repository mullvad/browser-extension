export type Location = {
  city: string;
  code: string;
  country: string;
  countryCode: string;
  longitude: number;
  latitude: number;
};

export type SocksProxy = {
  online: boolean;
  hostname: string;
  ipv4_address: string;
  ipv6_address: string;
  port: number;
  location: Location;
};

export interface Servers {
  [country: string]: {
    [city: string]: SocksProxy[];
  };
}

export type City = {
  city: string;
  proxyList: SocksProxy[];
};

export type Country = {
  country: string;
  cities: City[];
};
