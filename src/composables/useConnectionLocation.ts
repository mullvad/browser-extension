import type { Connection } from '@/helpers/connCheck.types';

const useConnectionLocation = (connection: Connection) => {
  const { city, country } = connection;
  
  if (!city && !country) {
    return 'Unknown location';
  }

  if (city && !country) {
    return city;
  }

  if (country && !city) {
    return country;
  }

  return `${city}, ${country}`;
};

export default useConnectionLocation;
