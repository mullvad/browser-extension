import { connCheck, Connection } from '@/helpers/connCheck';

//  Keep this outside of the hook to make it a singleton
const connection = ref({ isMullvad: false } as Connection);

const useConnection = () => {
  const updateConnection = async () => {
    connection.value = await connCheck();
  };
  
  updateConnection();

  return { connection, updateConnection };
};

export default useConnection;
