export type Location = {
  city: string;
  code: string;
  country: string;
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

export type Country = {
  country: string;
  cities: City[];
};

export type City = {
  city: string;
  proxyList: SocksProxy[];
};

export type Servers = {
  [country: string]: {
    [city: string]: SocksProxy[];
  };
};
