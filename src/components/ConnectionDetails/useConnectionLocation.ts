import { Connection } from '@/helpers/connCheck';
import { isProxy } from 'vue';

const useConnectionLocation = (conn: Connection) => {
  let connection = conn;
  if (isProxy(connection)) {
    connection = toRaw(connection);
  }
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
