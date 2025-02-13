import { SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

export const addCountryCodeToProxy = (proxy: SocksProxy) => {
  const { location } = proxy;
  const countryCode = location.code.substring(0, 2);

  return {
    ...proxy,
    location: {
      ...location,
      countryCode,
    },
  };
};

export const addCountryCode = (data: SocksProxy[]) => {
  return data.map(addCountryCodeToProxy);
};
